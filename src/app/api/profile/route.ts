import { NextResponse } from 'next/server';
import { getAuthenticatedUser, getUserProgressForUser } from '@/lib/api-helpers';

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const progress = await getUserProgressForUser(user.id);
    return NextResponse.json(progress);
  } catch (error: any) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
