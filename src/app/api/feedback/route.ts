import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/api-helpers';
import { feedbackSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    // 1. Validate request body against Zod schema
    const body = await req.json();
    const result = feedbackSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid parameters', details: result.error.format() }, { status: 400 });
    }

    const { rating, category, comment } = result.data;

    // 2. Extract client IP and apply sliding window rate limiter
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const isAllowed = checkRateLimit(ip, 3, 60000); // Max 3 feedbacks per minute per IP
    
    if (!isAllowed) {
      return NextResponse.json({ 
        error: 'Too many requests: Please wait a minute before submitting feedback again.' 
      }, { status: 429 });
    }

    // 3. Save feedback, link authenticated user if present
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
    console.error('POST /api/feedback error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
