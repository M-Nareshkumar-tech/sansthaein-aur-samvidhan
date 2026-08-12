import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthorizedUser } from '@/lib/auth-helpers';
import { simulatorSubmitSchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';
import { calculateLevel, checkAndUnlockBadges, getUserProgressForUser } from '@/lib/api-helpers';

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const { errorResponse, user } = await getAuthorizedUser();
    if (errorResponse) return errorResponse;

    // 2. Validate request body against Zod schema
    const body = await req.json();
    const result = simulatorSubmitSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid parameters', details: result.error.format() }, { status: 400 });
    }

    const { pathId, scenarioId, optionIndex } = result.data;

    // 3. Enforce anti-spam rate limiting (max 5 submissions per minute per user ID)
    const isAllowed = checkRateLimit(user.id, 5, 60000);
    if (!isAllowed) {
      return NextResponse.json({ 
        error: 'Rate limit: You are submitting simulator decisions too quickly. Read scenarios carefully.' 
      }, { status: 429 });
    }

    // 4. Validate scenario existence in database
    const scenario = await prisma.simulatorScenario.findUnique({
      where: { id: scenarioId },
      include: {
        path: true,
        options: {
          where: { optionIndex }
        }
      }
    });

    if (!scenario) {
      return NextResponse.json({ error: `Simulator scenario not found: ${scenarioId}` }, { status: 404 });
    }

    // 5. Verify relationship (prevent forged pathId + scenarioId combinations)
    if (scenario.pathId !== pathId) {
      return NextResponse.json({ error: 'Mismatched relationship: Scenario does not belong to the path.' }, { status: 400 });
    }

    // 6. Enforce server-side user level requirement
    if (user.profile.level < scenario.path.levelRequired) {
      return NextResponse.json({ 
        error: `Insufficient level: Path requires level ${scenario.path.levelRequired}` 
      }, { status: 403 });
    }

    // 7. Validate optionIndex
    const option = scenario.options[0];
    if (!option) {
      return NextResponse.json({ error: `Invalid optionIndex: ${optionIndex}` }, { status: 400 });
    }

    // 8. Log attempt history (always record subsequent attempts for analytics)
    await prisma.simulatorAttempt.create({
      data: {
        userId: user.id,
        scenarioId: scenario.id,
        chosenIndex: optionIndex
      }
    });

    // Get the correct option index dynamically
    const correctOpt = await prisma.simulatorOption.findFirst({
      where: { scenarioId, points: 40 }
    });
    const correctOptionIndex = correctOpt ? correctOpt.optionIndex : -1;

    let pointsAwarded = 0;
    let isFirstCompletion = false;

    // 9. Atomic Transaction Block for double-scoring prevention
    const lang = user.profile.languagePref || 'en';
    const explanation = lang === 'hi' 
      ? option.explanationHi 
      : lang === 'ta' 
        ? option.explanationTa 
        : option.explanationEn;

    try {
      const transactionResult = await prisma.$transaction(async (tx) => {
        // Query if already mastered
        const alreadyMastered = await tx.masteredScenario.findUnique({
          where: {
            userId_scenarioId: {
              userId: user.id,
              scenarioId: scenario.id
            }
          }
        });

        if (alreadyMastered) {
          return { pointsAwarded: 0, isFirstCompletion: false };
        }

        // Lock double-XP by inserting mastered record
        await tx.masteredScenario.create({
          data: {
            userId: user.id,
            scenarioId: scenario.id
          }
        });

        const newPoints = user.profile.points + option.points;
        const newLevel = calculateLevel(newPoints);

        // Update profile stats
        await tx.profile.update({
          where: { id: user.profile.id },
          data: {
            points: newPoints,
            level: newLevel
          }
        });

        return { pointsAwarded: option.points, isFirstCompletion: true, newPoints };
      });

      pointsAwarded = transactionResult.pointsAwarded;
      isFirstCompletion = transactionResult.isFirstCompletion;

      // Update badges outside transactional lock if points changed
      if (isFirstCompletion && transactionResult.newPoints) {
        await checkAndUnlockBadges(user.profile.id, transactionResult.newPoints);
      }
    } catch (txError) {
      console.warn('Simulator transaction uniqueness rollback triggered:', txError);
      pointsAwarded = 0;
      isFirstCompletion = false;
    }

    // 10. Fetch updated user progress mapping
    const progress = await getUserProgressForUser(user.id);

    return NextResponse.json({
      pointsAwarded,
      isCorrect: option.points === 40,
      correctOptionIndex,
      isFirstCompletion,
      explanation,
      progress
    });
  } catch (error: any) {
    console.error('POST /api/profile/simulator error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
