import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, getUserProgressForUser } from '@/lib/api-helpers';

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !user.profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { badgeName } = await req.json();
    if (!badgeName || typeof badgeName !== 'string') {
      return NextResponse.json({ error: 'Badge name is required' }, { status: 400 });
    }

    const existingBadges = await prisma.badge.findMany({
      where: { profileId: user.profile.id }
    });
    const exists = existingBadges.some(b => b.name === badgeName);

    if (!exists) {
      await prisma.badge.create({
        data: {
          profileId: user.profile.id,
          name: badgeName
        }
      });
    }

    const progress = await getUserProgressForUser(user.id);
    return NextResponse.json(progress);
  } catch (error: any) {
    console.error("POST /api/profile/badge error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
