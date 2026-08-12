import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/api-helpers';

export async function POST(req: Request) {
  try {
    const { rating, category, comment } = await req.json();
    if (typeof rating !== 'number' || !category || !comment) {
      return NextResponse.json({ error: 'rating, category and comment are required' }, { status: 400 });
    }

    const user = await getAuthenticatedUser();

    const feedback = await prisma.feedback.create({
      data: {
        userId: user ? user.id : null,
        rating,
        category,
        comment
      }
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error: any) {
    console.error("POST /api/feedback error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
