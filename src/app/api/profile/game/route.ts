import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, getUserProgressForUser, calculateLevel, checkAndUnlockBadges } from '@/lib/api-helpers';

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !user.profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gameType, scoreGained } = await req.json();
    if (!gameType || typeof scoreGained !== 'number') {
      return NextResponse.json({ error: 'gameType and scoreGained are required' }, { status: 400 });
    }

    // Log the game session in the DB
    await prisma.gameSession.create({
      data: {
        userId: user.id,
        gameType,
        pointsEarned: scoreGained
      }
    });

    // Add points to profile
    const newPoints = user.profile.points + scoreGained;
    const newLevel = calculateLevel(newPoints);

    await prisma.profile.update({
      where: { id: user.profile.id },
      data: {
        points: newPoints,
        level: newLevel
      }
    });

    await checkAndUnlockBadges(user.profile.id, newPoints);

    const progress = await getUserProgressForUser(user.id);
    return NextResponse.json(progress);
  } catch (error: any) {
    console.error("POST /api/profile/game error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
