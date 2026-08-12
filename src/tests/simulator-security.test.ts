import { vi, describe, it, expect, beforeEach } from 'vitest';
import { POST as simulatorSubmitHandler } from '../app/api/profile/simulator/route';
import { GET as simulatorPathsHandler } from '../app/api/simulator/paths/route';
import { prisma } from '../lib/prisma';
import { getAuthorizedUser } from '../lib/auth-helpers';
import { checkRateLimit } from '../lib/rate-limit';
import { NextResponse } from 'next/server';

// Mock auth-helpers
vi.mock('../lib/auth-helpers', () => ({
  getAuthorizedUser: vi.fn()
}));

// Mock rate-limit
vi.mock('../lib/rate-limit', () => ({
  checkRateLimit: vi.fn().mockReturnValue(true)
}));

// Mock api-helpers
vi.mock('../lib/api-helpers', () => ({
  calculateLevel: (points: number) => Math.max(1, Math.floor(points / 100) + 1),
  checkAndUnlockBadges: vi.fn(),
  getUserProgressForUser: vi.fn().mockResolvedValue({
    score: 100,
    level: 2
  })
}));

// Mock prisma
vi.mock('../lib/prisma', () => {
  const mockPrisma = {
    simulatorPath: {
      findMany: vi.fn()
    },
    simulatorScenario: {
      findUnique: vi.fn()
    },
    simulatorOption: {
      findFirst: vi.fn()
    },
    simulatorAttempt: {
      create: vi.fn()
    },
    masteredScenario: {
      findUnique: vi.fn(),
      create: vi.fn()
    },
    profile: {
      update: vi.fn()
    },
    $transaction: vi.fn()
  };
  // Self-execute transaction
  mockPrisma.$transaction.mockImplementation(async (callback) => {
    return await callback(mockPrisma);
  });
  return { prisma: mockPrisma };
});

describe('Decision Simulator Security Integration Tests', () => {
  const mockUser = {
    id: 'user-uuid-111',
    email: 'citizen@india.gov.in',
    role: 'CITIZEN',
    profile: {
      id: 'profile-uuid-222',
      points: 120,
      level: 2,
      languagePref: 'en'
    }
  };

  const mockScenario = {
    id: 'B1',
    pathId: 'beginner',
    titleEn: 'The Cabinet Appointment',
    titleHi: 'कैबिनेट की नियुक्ति',
    titleTa: 'அமைச்சரவை நியமனம்',
    descriptionEn: 'Details...',
    descriptionHi: 'विवरण...',
    descriptionTa: 'விவரங்கள்...',
    articleLinked: 'Article 75',
    path: {
      id: 'beginner',
      levelRequired: 1
    },
    options: [
      {
        scenarioId: 'B1',
        optionIndex: 1,
        textEn: 'Appoint...',
        textHi: 'नियुक्त...',
        textTa: 'நியமிக்கவும்...',
        points: 40,
        explanationEn: 'Correct explanation',
        explanationHi: 'सही व्याख्या',
        explanationTa: 'சரியான விளக்கம்'
      }
    ]
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getAuthorizedUser).mockResolvedValue({
      errorResponse: null,
      user: mockUser as any
    });
    vi.mocked(checkRateLimit).mockReturnValue(true);
  });

  describe('1. Authentication Gate', () => {
    it('should return 401 Unauthorized if request fails authentication check', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({
        errorResponse: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
        user: null as any
      });

      const req = new Request('http://localhost/api/profile/simulator', {
        method: 'POST',
        body: JSON.stringify({
          pathId: 'beginner',
          scenarioId: 'B1',
          optionIndex: 1
        })
      });
      const res = await simulatorSubmitHandler(req);
      expect(res.status).toBe(401);
      const json = await res.json();
      expect(json.error).toBe('Unauthorized');
    });
  });

  describe('2. Server-side Level Gate Enforcement', () => {
    it('should block users who attempt paths above their level', async () => {
      // User is Level 2, Path requires Level 5
      const highLevelScenario = {
        ...mockScenario,
        pathId: 'advanced',
        path: {
          id: 'advanced',
          levelRequired: 5
        }
      };
      vi.mocked(prisma.simulatorScenario.findUnique).mockResolvedValue(highLevelScenario as any);

      const req = new Request('http://localhost/api/profile/simulator', {
        method: 'POST',
        body: JSON.stringify({
          pathId: 'advanced',
          scenarioId: 'B1',
          optionIndex: 1
        })
      });
      const res = await simulatorSubmitHandler(req);
      expect(res.status).toBe(403);
      const json = await res.json();
      expect(json.error).toContain('Insufficient level');
    });
  });

  describe('3. Database Parameter Validation', () => {
    it('should return 404 if scenario does not exist in the database', async () => {
      vi.mocked(prisma.simulatorScenario.findUnique).mockResolvedValue(null);

      const req = new Request('http://localhost/api/profile/simulator', {
        method: 'POST',
        body: JSON.stringify({
          pathId: 'beginner',
          scenarioId: 'NonExistent',
          optionIndex: 1
        })
      });
      const res = await simulatorSubmitHandler(req);
      expect(res.status).toBe(404);
      const json = await res.json();
      expect(json.error).toContain('Simulator scenario not found');
    });

    it('should return 400 if option index does not exist for the scenario', async () => {
      // Find returns no option (mismatched option index)
      vi.mocked(prisma.simulatorScenario.findUnique).mockResolvedValue(mockScenario as any);
      // options is filtered empty
      const emptyScenario = {
        ...mockScenario,
        options: []
      };
      vi.mocked(prisma.simulatorScenario.findUnique).mockResolvedValue(emptyScenario as any);

      const req = new Request('http://localhost/api/profile/simulator', {
        method: 'POST',
        body: JSON.stringify({
          pathId: 'beginner',
          scenarioId: 'B1',
          optionIndex: 99
        })
      });
      const res = await simulatorSubmitHandler(req);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toContain('Invalid optionIndex');
    });
  });

  describe('4. Forged Relationship Detection', () => {
    it('should reject requests where the scenario does not belong to the submitted path', async () => {
      vi.mocked(prisma.simulatorScenario.findUnique).mockResolvedValue(mockScenario as any);

      const req = new Request('http://localhost/api/profile/simulator', {
        method: 'POST',
        body: JSON.stringify({
          pathId: 'expert', // Forged pathId mismatch
          scenarioId: 'B1',
          optionIndex: 1
        })
      });
      const res = await simulatorSubmitHandler(req);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.error).toContain('Mismatched relationship');
    });
  });

  describe('5. Points / Score Tampering Shield', () => {
    it('should ignore client-injected scores/points and calculate score strictly from server database weight', async () => {
      vi.mocked(prisma.simulatorScenario.findUnique).mockResolvedValue(mockScenario as any);
      vi.mocked(prisma.masteredScenario.findUnique).mockResolvedValue(null);
      vi.mocked(prisma.simulatorOption.findFirst).mockResolvedValue(mockScenario.options[0] as any);

      const req = new Request('http://localhost/api/profile/simulator', {
        method: 'POST',
        body: JSON.stringify({
          pathId: 'beginner',
          scenarioId: 'B1',
          optionIndex: 1,
          points: 9999 // Client-side injection attempt
        })
      });
      
      const res = await simulatorSubmitHandler(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      // Should give database points (40), not injected points (9999)
      expect(json.pointsAwarded).toBe(40);
    });
  });

  describe('6. Atomic Points / Mastery Logging', () => {
    it('should award points and create mastered record if it is the first completion', async () => {
      vi.mocked(prisma.simulatorScenario.findUnique).mockResolvedValue(mockScenario as any);
      vi.mocked(prisma.masteredScenario.findUnique).mockResolvedValue(null);
      vi.mocked(prisma.simulatorOption.findFirst).mockResolvedValue(mockScenario.options[0] as any);

      const req = new Request('http://localhost/api/profile/simulator', {
        method: 'POST',
        body: JSON.stringify({
          pathId: 'beginner',
          scenarioId: 'B1',
          optionIndex: 1
        })
      });
      
      const res = await simulatorSubmitHandler(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.pointsAwarded).toBe(40);
      expect(json.isFirstCompletion).toBe(true);
      expect(prisma.masteredScenario.create).toHaveBeenCalled();
      expect(prisma.profile.update).toHaveBeenCalled();
    });
  });

  describe('7. Double-Reward Prevention on Duplicate Submissions', () => {
    it('should return 0 points if user submits an already mastered scenario', async () => {
      vi.mocked(prisma.simulatorScenario.findUnique).mockResolvedValue(mockScenario as any);
      // Already mastered!
      vi.mocked(prisma.masteredScenario.findUnique).mockResolvedValue({ id: 'existing-id' } as any);
      vi.mocked(prisma.simulatorOption.findFirst).mockResolvedValue(mockScenario.options[0] as any);

      const req = new Request('http://localhost/api/profile/simulator', {
        method: 'POST',
        body: JSON.stringify({
          pathId: 'beginner',
          scenarioId: 'B1',
          optionIndex: 1
        })
      });
      
      const res = await simulatorSubmitHandler(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      // 0 points awarded!
      expect(json.pointsAwarded).toBe(0);
      expect(json.isFirstCompletion).toBe(false);
      expect(prisma.masteredScenario.create).not.toHaveBeenCalled();
    });
  });

  describe('8. Rate Limiting Protection', () => {
    it('should block simulator submissions exceeding speed thresholds with 429', async () => {
      vi.mocked(checkRateLimit).mockReturnValue(false); // Rate limit active!

      const req = new Request('http://localhost/api/profile/simulator', {
        method: 'POST',
        body: JSON.stringify({
          pathId: 'beginner',
          scenarioId: 'B1',
          optionIndex: 1
        })
      });
      
      const res = await simulatorSubmitHandler(req);
      expect(res.status).toBe(429);
      const json = await res.json();
      expect(json.error).toContain('Rate limit');
    });
  });
});
