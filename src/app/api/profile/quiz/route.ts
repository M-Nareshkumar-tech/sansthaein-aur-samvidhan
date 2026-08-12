import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthorizedUser } from '@/lib/auth-helpers';
import { quizSchema } from '@/lib/validation';
import { calculateLevel, getUserProgressForUser, checkAndUnlockBadges } from '@/lib/api-helpers';

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const { errorResponse, user } = await getAuthorizedUser();
    if (errorResponse) return errorResponse;

    // 2. Validate request body against Zod schema
    const body = await req.json();
    const result = quizSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid parameters', details: result.error.format() }, { status: 400 });
    }

    const { questionId, chosenOptionIndex } = result.data;

    // 3. Retrieve question from database
    const question = await prisma.scenarioQuestion.findUnique({
      where: { id: questionId },
      include: { article: true }
    });

    if (!question) {
      return NextResponse.json({ error: 'Scenario question not found' }, { status: 404 });
    }

    // 4. Determine correctness server-side
    const isCorrect = chosenOptionIndex === question.correctAnswerIdx;

    // 5. Log attempt in QuizAttempt for analytical logs
    await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        questionId: question.id,
        chosenIdx: chosenOptionIndex,
        isCorrect: isCorrect
      }
    });

    let xpAwarded = 0;
    let isFirstMastery = false;

    // 6. Handle points awarding via mastery uniqueness lock
    if (isCorrect) {
      try {
        // Query to check if they already mastered it
        const alreadyMastered = await prisma.masteredQuestion.findUnique({
          where: {
            userId_questionId: {
              userId: user.id,
              questionId: question.id
            }
          }
        });

        if (!alreadyMastered) {
          // Attempt to create mastery log. Compound index @@unique([userId, questionId])
          // prevents concurrent race conditions from double creating.
          await prisma.masteredQuestion.create({
            data: {
              userId: user.id,
              questionId: question.id
            }
          });

          isFirstMastery = true;
          xpAwarded = 25; // 25 XP for first mastery

          // Update user points and level
          const newPoints = user.profile.points + xpAwarded;
          const newLevel = calculateLevel(newPoints);

          await prisma.profile.update({
            where: { id: user.profile.id },
            data: {
              points: newPoints,
              level: newLevel
            }
          });

          // Evaluate badges
          await checkAndUnlockBadges(user.profile.id, newPoints);
        }
      } catch (dbError) {
        // Uniqueness constraint trigger (race condition override)
        console.warn('Concurrences mastery race condition triggered:', dbError);
        isFirstMastery = false;
        xpAwarded = 0;
      }
    }

    // 7. Get updated progress structure
    const progress = await getUserProgressForUser(user.id);

    return NextResponse.json({
      correct: isCorrect,
      xpAwarded,
      isFirstMastery,
      explanation: isCorrect 
        ? question.explanationEn // Return appropriate explanation
        : 'Incorrect decision. Analyze the options and referenced constitutional articles again.',
      progress
    });
  } catch (error: any) {
    console.error('POST /api/profile/quiz error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
