import { vi, describe, it, expect, beforeEach } from 'vitest';
import { POST as quizHandler } from '../app/api/profile/quiz/route';
import { POST as gameHandler } from '../app/api/profile/game/route';
import { POST as badgeHandler } from '../app/api/profile/badge/route';
import { POST as feedbackHandler } from '../app/api/feedback/route';
import { signToken, verifyToken } from '../lib/jwt';
import { prisma } from '../lib/prisma';
import { getAuthorizedUser } from '../lib/auth-helpers';
import { checkAndUnlockBadges } from '../lib/api-helpers';

// Mock authorization helpers
vi.mock('../lib/auth-helpers', () => ({
  getAuthorizedUser: vi.fn()
}));

// Mock API progress helpers
vi.mock('../lib/api-helpers', () => ({
  getAuthenticatedUser: vi.fn(),
  getUserProgressForUser: vi.fn().mockResolvedValue({
    score: 100,
    level: 2,
    completedArticles: [],
    completedQuizzes: [],
    badges: [],
    gameStats: {},
    feedbackLogs: []
  }),
  calculateLevel: (points: number) => Math.max(1, Math.floor(points / 100) + 1),
  checkAndUnlockBadges: vi.fn()
}));

// Mock Prisma client singleton
vi.mock('../lib/prisma', () => ({
  prisma: {
    scenarioQuestion: {
      findUnique: vi.fn(),
      findFirst: vi.fn()
    },
    quizAttempt: {
      create: vi.fn()
    },
    masteredQuestion: {
      findUnique: vi.fn(),
      create: vi.fn()
    },
    profile: {
      update: vi.fn()
    },
    gameSession: {
      findFirst: vi.fn(),
      create: vi.fn()
    },
    feedback: {
      create: vi.fn()
    },
    badge: {
      findMany: vi.fn()
    }
  }
}));

describe('Security & Data Integrity Pipeline Tests', () => {
  const mockUser = {
    id: 'user-uuid-123',
    email: 'citizen@india.gov.in',
    role: 'CITIZEN',
    profile: {
      id: 'profile-uuid-456',
      points: 50,
      level: 1
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('JWT Secret Security & Fail-Closed Logic', () => {
    it('should throw an initialization error if JWT_SECRET is missing during signToken', async () => {
      const originalSecret = process.env.JWT_SECRET;
      delete process.env.JWT_SECRET;

      await expect(
        signToken({ userId: '1', email: 'a@b.com', role: 'CITIZEN' })
      ).rejects.toThrow('FATAL: JWT_SECRET environment variable is missing.');

      process.env.JWT_SECRET = originalSecret;
    });

    it('should return null (fail closed) if JWT_SECRET is missing during verifyToken', async () => {
      const originalSecret = process.env.JWT_SECRET;
      delete process.env.JWT_SECRET;

      const result = await verifyToken('some-token');
      expect(result).toBeNull();

      process.env.JWT_SECRET = originalSecret;
    });
  });

  describe('Server-Authoritative Quiz Engine', () => {
    it('should determine correctness from database and ignore correct parameters sent by client', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({ errorResponse: null, user: mockUser });
      
      // Question has correctAnswerIdx = 2
      vi.mocked(prisma.scenarioQuestion.findUnique).mockResolvedValue({
        id: 'question-uuid-789',
        articleId: 'article-1',
        questionTextEn: 'Q?',
        questionTextHi: '',
        questionTextTa: '',
        optionsEn: '[]',
        optionsHi: '[]',
        optionsTa: '[]',
        correctAnswerIdx: 2,
        explanationEn: 'Correct!',
        explanationHi: '',
        explanationTa: ''
      } as any);

      // Client sends correct: true, but chosenOptionIndex: 0 (incorrect)
      const payload = {
        questionId: '550e8400-e29b-41d4-a716-446655440000', // valid UUID
        chosenOptionIndex: 0,
        correct: true // spoof flag
      };

      const req = new Request('http://localhost/api/profile/quiz', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      const res = await quizHandler(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.correct).toBe(false); // Ignored spoof correct flag
      expect(data.xpAwarded).toBe(0);
    });

    it('should award 25 XP only once and return 0 XP for duplicate correct completions', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({ errorResponse: null, user: mockUser });
      
      vi.mocked(prisma.scenarioQuestion.findUnique).mockResolvedValue({
        id: 'question-uuid-789',
        articleId: 'article-1',
        correctAnswerIdx: 2,
        explanationEn: 'Correct!'
      } as any);

      // 1. First attempt: mock mastered check returns null (not mastered yet)
      vi.mocked(prisma.masteredQuestion.findUnique).mockResolvedValue(null);

      const payload = {
        questionId: '550e8400-e29b-41d4-a716-446655440000',
        chosenOptionIndex: 2
      };

      const req1 = new Request('http://localhost/api/profile/quiz', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      const res1 = await quizHandler(req1);
      const data1 = await res1.json();

      expect(data1.correct).toBe(true);
      expect(data1.xpAwarded).toBe(25);
      expect(data1.isFirstMastery).toBe(true);

      // 2. Second attempt: mock mastered check returns existing record
      vi.mocked(prisma.masteredQuestion.findUnique).mockResolvedValue({ id: 'existing-id' } as any);

      const req2 = new Request('http://localhost/api/profile/quiz', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      const res2 = await quizHandler(req2);
      const data2 = await res2.json();

      expect(data2.correct).toBe(true);
      expect(data2.xpAwarded).toBe(0); // 0 points awarded
      expect(data2.isFirstMastery).toBe(false);
    });
  });

  describe('Game Session Score Verification', () => {
    it('should reject impossible score values exceeding the cap', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({ errorResponse: null, user: mockUser });

      // Client sends spin score = 500 (max cap is 50)
      const req = new Request('http://localhost/api/profile/game', {
        method: 'POST',
        body: JSON.stringify({ gameType: 'spin', scoreGained: 500 })
      });

      const res = await gameHandler(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toContain('Impossible score');
    });

    it('should block game results submitted faster than min duration cooldown thresholds', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({ errorResponse: null, user: mockUser });
      
      // Last game play was logged 1 second ago (violates 20s minimum snakes cooldown)
      vi.mocked(prisma.gameSession.findFirst).mockResolvedValue({
        id: 'session-1',
        createdAt: new Date(Date.now() - 1000)
      } as any);

      const req = new Request('http://localhost/api/profile/game', {
        method: 'POST',
        body: JSON.stringify({ gameType: 'snakes', scoreGained: 150 })
      });

      const res = await gameHandler(req);
      const data = await res.json();

      expect(res.status).toBe(429);
      expect(data.error).toContain('Rate limit');
    });
  });

  describe('Badge Unlocking & Evaluate Endpoint', () => {
    it('should ignore client-provided badge requests and unlock only milestones matching database points', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({ errorResponse: null, user: mockUser });

      const req = new Request('http://localhost/api/profile/badge', {
        method: 'POST',
        body: JSON.stringify({ badgeName: 'Constitution Guardian' }) // Injection attempt
      });

      await badgeHandler(req);

      // Verify that checkAndUnlockBadges was called with user's points (50), not the payload badge name
      expect(checkAndUnlockBadges).toHaveBeenCalledWith(mockUser.profile.id, 50);
    });
  });

  describe('Feedback Rate Limiting', () => {
    it('should allow initial requests but return 429 for rate-limit violations', async () => {
      // First feedback
      const payload = { rating: 5, category: 'Bug', comment: 'Great app' };
      const headers = { 'x-forwarded-for': '192.168.1.1' };

      const runRequest = async () => {
        return await feedbackHandler(
          new Request('http://localhost/api/feedback', {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
          })
        );
      };

      const res1 = await runRequest();
      const res2 = await runRequest();
      const res3 = await runRequest();
      const res4 = await runRequest(); // 4th request (violates max 3/min limit)

      expect(res1.status).toBe(200);
      expect(res2.status).toBe(200);
      expect(res3.status).toBe(200);
      expect(res4.status).toBe(429);
    });
  });
});
