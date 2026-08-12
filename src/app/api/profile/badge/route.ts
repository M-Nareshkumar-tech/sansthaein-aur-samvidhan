import { NextResponse } from 'next/server';
import { getAuthorizedUser } from '@/lib/auth-helpers';
import { checkAndUnlockBadges, getUserProgressForUser } from '@/lib/api-helpers';

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const { errorResponse, user } = await getAuthorizedUser();
    if (errorResponse) return errorResponse;

    // 2. Perform server-side evaluation based on user's actual database points
    const currentPoints = user.profile.points;
    await checkAndUnlockBadges(user.profile.id, currentPoints);

    // 3. Retrieve and return updated progress profile
    const progress = await getUserProgressForUser(user.id);
    return NextResponse.json(progress);
  } catch (error: any) {
    console.error('POST /api/profile/badge evaluation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
