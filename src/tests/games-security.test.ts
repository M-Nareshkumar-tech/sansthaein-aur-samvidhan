import { vi, describe, it, expect, beforeEach } from 'vitest';
import { GET as gamesContentHandler } from '../app/api/games/content/route';
import { POST as gamesVerifyHandler } from '../app/api/profile/game/verify/route';
import { prisma } from '../lib/prisma';
import { getAuthorizedUser } from '../lib/auth-helpers';
import { NextResponse } from 'next/server';

// Mock auth-helpers
vi.mock('../lib/auth-helpers', () => ({
  getAuthorizedUser: vi.fn()
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
    gameContent: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn()
    },
    gameAttempt: {
      create: vi.fn(),
      findFirst: vi.fn()
    },
    gameMastery: {
      create: vi.fn()
    },
    scenarioQuestion: {
      findUnique: vi.fn()
    },
    scenarioMastery: {
      create: vi.fn()
    },
    quizAttempt: {
      create: vi.fn(),
      findMany: vi.fn()
    },
    profile: {
      findUnique: vi.fn(),
      update: vi.fn()
    },
    user: {
      findUnique: vi.fn()
    },
    $transaction: vi.fn()
  };
  // Self-execute transaction
  mockPrisma.$transaction.mockImplementation(async (callback) => {
    return await callback(mockPrisma);
  });
  return { prisma: mockPrisma };
});

describe('Sandbox Games Security & Scoring Tests', () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/games/content', () => {
    it('should reject request if gameType query param is missing', async () => {
      const req = new Request('http://localhost:3000/api/games/content');
      const response = await gamesContentHandler(req);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toContain('Invalid gameType');
    });

    it('should reject request if gameType is invalid', async () => {
      const req = new Request('http://localhost:3000/api/games/content?gameType=fakegame');
      const response = await gamesContentHandler(req);
      expect(response.status).toBe(400);
    });

    it('should return point-obfuscated and answer-obfuscated localized content', async () => {
      const mockGameItems = [
        {
          id: 'item-1',
          gameType: 'snakes',
          identifier: 'ladder_4',
          titleEn: 'Writ of Habeas Corpus',
          titleHi: '',
          titleTa: '',
          descriptionEn: 'Details',
          descriptionHi: '',
          descriptionTa: '',
          questionEn: 'Which organ issues writs?',
          questionHi: '',
          questionTa: '',
          optionsEn: JSON.stringify(['Parliament', 'Police', 'Judiciary']),
          optionsHi: JSON.stringify([]),
          optionsTa: JSON.stringify([]),
          correctAnswerIdx: 2,
          points: 25,
          explanationEn: 'The Judiciary issues writs.',
          explanationHi: '',
          explanationTa: ''
        }
      ];

      vi.mocked(prisma.gameContent.findMany).mockResolvedValue(mockGameItems as any);

      const req = new Request('http://localhost:3000/api/games/content?gameType=snakes');
      const response = await gamesContentHandler(req);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveLength(1);
      expect(data[0].identifier).toBe('ladder_4');
      expect(data[0].title).toBe('Writ of Habeas Corpus');
      expect(data[0].question).toBe('Which organ issues writs?');
      expect(data[0].options).toEqual(['Parliament', 'Police', 'Judiciary']);
      
      // Verification of point and answer obfuscation
      expect(data[0].correctAnswerIdx).toBeUndefined();
      expect(data[0].points).toBeUndefined();
      expect(data[0].explanationEn).toBeUndefined();
      expect(data[0].explanation).toBeUndefined();
    });
  });

  describe('POST /api/profile/game/verify', () => {
    it('should block unauthenticated requests', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({
        errorResponse: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
        user: null as any
      });

      const req = new Request('http://localhost:3000/api/profile/game/verify', {
        method: 'POST',
        body: JSON.stringify({ gameType: 'snakes', identifier: 'ladder_4', chosenOptionIndex: 2 })
      });

      const response = await gamesVerifyHandler(req);
      expect(response.status).toBe(401);
    });

    it('should reject invalid verify payload bounds', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({
        errorResponse: null,
        user: mockUser as any
      });

      const req = new Request('http://localhost:3000/api/profile/game/verify', {
        method: 'POST',
        body: JSON.stringify({ gameType: 'fake', identifier: '', chosenOptionIndex: -5 })
      });

      const response = await gamesVerifyHandler(req);
      expect(response.status).toBe(400);
    });

    it('should evaluate an incorrect answer and award 0 points', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({
        errorResponse: null,
        user: mockUser as any
      });

      const mockContent = {
        id: 'content-uuid',
        gameType: 'snakes',
        identifier: 'ladder_4',
        correctAnswerIdx: 2,
        points: 25,
        explanationEn: 'Judiciary.',
        explanationHi: '',
        explanationTa: ''
      };

      vi.mocked(prisma.gameContent.findUnique).mockResolvedValue(mockContent as any);
      vi.mocked(prisma.gameAttempt.create).mockResolvedValue({ id: 'attempt-1' } as any);

      const req = new Request('http://localhost:3000/api/profile/game/verify', {
        method: 'POST',
        body: JSON.stringify({ gameType: 'snakes', identifier: 'ladder_4', chosenOptionIndex: 0 })
      });

      const response = await gamesVerifyHandler(req);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.isCorrect).toBe(false);
      expect(data.pointsAwarded).toBe(0);
      expect(data.explanation).toBe('');
      expect(prisma.profile.update).not.toHaveBeenCalled();
    });

    it('should award points on correct answer if not previously solved', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({
        errorResponse: null,
        user: mockUser as any
      });

      const mockContent = {
        id: 'content-uuid',
        gameType: 'snakes',
        identifier: 'ladder_4',
        correctAnswerIdx: 2,
        points: 25,
        explanationEn: 'Judiciary.',
        explanationHi: '',
        explanationTa: ''
      };

      vi.mocked(prisma.gameContent.findUnique).mockResolvedValue(mockContent as any);
      vi.mocked(prisma.gameAttempt.create).mockResolvedValue({ id: 'attempt-1' } as any);
      vi.mocked(prisma.gameMastery.create).mockResolvedValue({ id: 'mastery-1' } as any); // Success mastery insert
      vi.mocked(prisma.profile.findUnique).mockResolvedValue({ id: 'profile-uuid', points: 100 } as any);
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);

      const req = new Request('http://localhost:3000/api/profile/game/verify', {
        method: 'POST',
        body: JSON.stringify({ gameType: 'snakes', identifier: 'ladder_4', chosenOptionIndex: 2 })
      });

      const response = await gamesVerifyHandler(req);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.isCorrect).toBe(true);
      expect(data.pointsAwarded).toBe(25);
      expect(data.explanation).toBe('Judiciary.');
      expect(prisma.profile.update).toHaveBeenCalledWith({
        where: { id: 'profile-uuid' },
        data: { points: 125, level: 2 }
      });
    });

    it('should block double-XP by awarding 0 points if previously solved (throwing constraint error)', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({
        errorResponse: null,
        user: mockUser as any
      });

      const mockContent = {
        id: 'content-uuid',
        gameType: 'snakes',
        identifier: 'ladder_4',
        correctAnswerIdx: 2,
        points: 25,
        explanationEn: 'Judiciary.',
        explanationHi: '',
        explanationTa: ''
      };

      vi.mocked(prisma.gameContent.findUnique).mockResolvedValue(mockContent as any);
      vi.mocked(prisma.gameAttempt.create).mockResolvedValue({ id: 'attempt-2' } as any);
      
      // Simulate double-XP insert block (Prisma throws error on unique constraint)
      vi.mocked(prisma.gameMastery.create).mockRejectedValue(new Error('P2002 Unique constraint failed'));

      const req = new Request('http://localhost:3000/api/profile/game/verify', {
        method: 'POST',
        body: JSON.stringify({ gameType: 'snakes', identifier: 'ladder_4', chosenOptionIndex: 2 })
      });

      const response = await gamesVerifyHandler(req);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.isCorrect).toBe(true);
      expect(data.pointsAwarded).toBe(0); // 0 points awarded!
      expect(prisma.profile.update).not.toHaveBeenCalled();
    });

    it('should support Spin the Wheel verification and award 40 XP', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({
        errorResponse: null,
        user: mockUser as any
      });

      const mockQuestion = {
        id: 'question-uuid',
        correctAnswerIdx: 1,
        explanationEn: 'Speaker certifies it.',
        explanationHi: '',
        explanationTa: ''
      };

      vi.mocked(prisma.scenarioQuestion.findUnique).mockResolvedValue(mockQuestion as any);
      vi.mocked(prisma.quizAttempt.create).mockResolvedValue({ id: 'quiz-attempt-1' } as any);
      vi.mocked(prisma.scenarioMastery.create).mockResolvedValue({ id: 'mastery-2' } as any);
      vi.mocked(prisma.profile.findUnique).mockResolvedValue({ id: 'profile-uuid', points: 100 } as any);
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);

      const req = new Request('http://localhost:3000/api/profile/game/verify', {
        method: 'POST',
        body: JSON.stringify({ gameType: 'spin', identifier: 'question-uuid', chosenOptionIndex: 1 })
      });

      const response = await gamesVerifyHandler(req);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.isCorrect).toBe(true);
      expect(data.pointsAwarded).toBe(40);
      expect(data.explanation).toBe('Speaker certifies it.');
    });

    it('should support special completion token and award 100 XP win bonus', async () => {
      vi.mocked(getAuthorizedUser).mockResolvedValue({
        errorResponse: null,
        user: mockUser as any
      });

      const mockCompletionContent = {
        id: 'comp-uuid',
        gameType: 'board',
        identifier: 'completion',
        correctAnswerIdx: 0,
        points: 100
      };

      vi.mocked(prisma.gameContent.findFirst).mockResolvedValue(mockCompletionContent as any);
      vi.mocked(prisma.gameAttempt.create).mockResolvedValue({ id: 'attempt-c' } as any);
      vi.mocked(prisma.gameMastery.create).mockResolvedValue({ id: 'mastery-c' } as any);
      vi.mocked(prisma.profile.findUnique).mockResolvedValue({ id: 'profile-uuid', points: 100 } as any);
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);

      const req = new Request('http://localhost:3000/api/profile/game/verify', {
        method: 'POST',
        body: JSON.stringify({ gameType: 'board', identifier: 'completion', chosenOptionIndex: 0 })
      });

      const response = await gamesVerifyHandler(req);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.isCorrect).toBe(true);
      expect(data.pointsAwarded).toBe(100);
    });
  });
});
