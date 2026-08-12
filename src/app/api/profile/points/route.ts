import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, getUserProgressForUser, calculateLevel, checkAndUnlockBadges } from '@/lib/api-helpers';

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !user.profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { points } = await req.json();
    if (typeof points !== 'number') {
      return NextResponse.json({ error: 'Points must be a number' }, { status: 400 });
    }

    const newPoints = user.profile.points + points;
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
    console.error("POST /api/profile/points error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
