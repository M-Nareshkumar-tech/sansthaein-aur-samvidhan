import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthorizedUser } from '@/lib/auth-helpers';
import { gameSchema } from '@/lib/validation';
import { calculateLevel, getUserProgressForUser, checkAndUnlockBadges } from '@/lib/api-helpers';

// Define strict limits and minimum gameplay durations on the server
const GAME_LIMITS = {
  spin: { maxScore: 50, cooldownMs: 5000 },       // Max 50 XP, Min 5s
  flashcards: { maxScore: 100, cooldownMs: 10000 }, // Max 100 XP, Min 10s
  snakes: { maxScore: 250, cooldownMs: 20000 },     // Max 250 XP, Min 20s
  board: { maxScore: 300, cooldownMs: 30000 }       // Max 300 XP, Min 30s
};

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const { errorResponse, user } = await getAuthorizedUser();
    if (errorResponse) return errorResponse;

    // 2. Validate request body against Zod schema
    const body = await req.json();
    const result = gameSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid parameters', details: result.error.format() }, { status: 400 });
    }

    const { gameType, scoreGained } = result.data;
    const rules = GAME_LIMITS[gameType];

    // 3. Enforce maximum points safety limit
    if (scoreGained > rules.maxScore) {
      return NextResponse.json({ error: `Impossible score for game type: ${gameType}` }, { status: 400 });
    }

    // 4. Enforce server-side cooldown delay to block speed scripts
    const lastSession = await prisma.gameSession.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    if (lastSession) {
      const timeDelta = Date.now() - lastSession.createdAt.getTime();
      if (timeDelta < rules.cooldownMs) {
        return NextResponse.json({ 
          error: 'Rate limit: You are submitting game results too quickly. Play again normally.' 
        }, { status: 429 });
      }
    }

    // 5. Create GameSession log in the DB
    await prisma.gameSession.create({
      data: {
        userId: user.id,
        gameType,
        pointsEarned: scoreGained
      }
    });

    // 6. Award validated points to profile
    const newPoints = user.profile.points + scoreGained;
    const newLevel = calculateLevel(newPoints);

    await prisma.profile.update({
      where: { id: user.profile.id },
      data: {
        points: newPoints,
        level: newLevel
      }
    });

    // 7. Evaluate and unlock badges
    await checkAndUnlockBadges(user.profile.id, newPoints);

    // 8. Fetch and return updated progress profile
    const progress = await getUserProgressForUser(user.id);
    return NextResponse.json(progress);
  } catch (error: any) {
    console.error('POST /api/profile/game error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
