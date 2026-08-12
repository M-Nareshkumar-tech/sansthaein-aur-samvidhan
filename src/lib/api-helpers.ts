import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import { UserProgress } from '@/lib/db';

export async function getAuthenticatedUser() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) return null;

    const payload = await verifyToken(sessionCookie.value);
    if (!payload) return null;

    return await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { profile: true }
    });
  } catch (error) {
    console.error("Error getting authenticated user:", error);
    return null;
  }
}

export async function getUserProgressForUser(userId: string): Promise<UserProgress> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: {
        include: {
          badges: true
        }
      },
      gameSessions: true,
      attempts: {
        include: {
          question: {
            include: {
              article: true
            }
          }
        }
      },
      feedbacks: true
    }
  });

  if (!user || !user.profile) {
    throw new Error('User or profile not found');
  }

  // Get distinct completed articles and quizzes (correct attempts only)
  const correctAttempts = user.attempts.filter(a => a.isCorrect);
  const completedArticles = Array.from(new Set(correctAttempts.map(a => a.question.article.articleNumber)));
  const completedQuizzes = Array.from(new Set(correctAttempts.map(a => a.questionId)));

  const spinSessions = user.gameSessions.filter(s => s.gameType === 'spin');
  const snakesSessions = user.gameSessions.filter(s => s.gameType === 'snakes');
  const boardSessions = user.gameSessions.filter(s => s.gameType === 'board');
  const flashcardsSessions = user.gameSessions.filter(s => s.gameType === 'flashcards');

  return {
    score: user.profile.points,
    level: user.profile.level,
    completedArticles,
    completedQuizzes,
    badges: user.profile.badges.map(b => b.name),
    gameStats: {
      spin: {
        plays: spinSessions.length,
        highScore: spinSessions.length > 0 ? Math.max(...spinSessions.map(s => s.pointsEarned)) : 0
      },
      snakes: {
        plays: snakesSessions.length,
        highScore: snakesSessions.length > 0 ? Math.max(...snakesSessions.map(s => s.pointsEarned)) : 0
      },
      board: {
        plays: boardSessions.length,
        highScore: boardSessions.length > 0 ? Math.max(...boardSessions.map(s => s.pointsEarned)) : 0
      },
      flashcards: {
        plays: flashcardsSessions.length,
        highScore: flashcardsSessions.length > 0 ? Math.max(...flashcardsSessions.map(s => s.pointsEarned)) : 0
      }
    },
    feedbackLogs: user.feedbacks.map(f => ({
      id: f.id,
      timestamp: f.createdAt.toLocaleString(),
      rating: f.rating,
      comment: f.comment,
      category: f.category
    }))
  };
}

export function calculateLevel(points: number): number {
  return Math.max(1, Math.floor(points / 100) + 1);
}

export async function checkAndUnlockBadges(profileId: string, currentPoints: number) {
  const existingBadges = await prisma.badge.findMany({
    where: { profileId }
  });
  const badgeNames = existingBadges.map(b => b.name);
  
  const toUnlock = [];
  if (currentPoints >= 100 && !badgeNames.includes("Citizen Scholar")) {
    toUnlock.push("Citizen Scholar");
  }
  if (currentPoints >= 250 && !badgeNames.includes("Lawmaker Cadet")) {
    toUnlock.push("Lawmaker Cadet");
  }
  if (currentPoints >= 500 && !badgeNames.includes("Constitution Guardian")) {
    toUnlock.push("Constitution Guardian");
  }

  for (const badge of toUnlock) {
    await prisma.badge.create({
      data: {
        profileId,
        name: badge
      }
    });
  }
}
