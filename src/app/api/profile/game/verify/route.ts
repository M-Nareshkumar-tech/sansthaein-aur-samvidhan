import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthorizedUser } from '@/lib/auth-helpers';
import { gameVerifySchema } from '@/lib/validation';
import { calculateLevel, getUserProgressForUser, checkAndUnlockBadges } from '@/lib/api-helpers';

// Centralized rate limiter map for games verification
const rateLimits = new Map<string, number>();
const COOLDOWN_MS = 2500; // 2.5 seconds anti-spam delay

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const { errorResponse, user } = await getAuthorizedUser();
    if (errorResponse) return errorResponse;

    // 2. Anti-spam rate limiting check
    const now = Date.now();
    const lastRequestTime = rateLimits.get(user.id) || 0;
    if (process.env.NODE_ENV !== 'test' && now - lastRequestTime < COOLDOWN_MS) {
      return NextResponse.json({
        error: 'Too many requests. Please slow down and submit answers normally.'
      }, { status: 429 });
    }
    rateLimits.set(user.id, now);

    // 3. Validate request payload against Zod schema
    const body = await req.json();
    const result = gameVerifySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid parameters', details: result.error.format() }, { status: 400 });
    }

    const { gameType, identifier, chosenOptionIndex } = result.data;

    let isCorrect = false;
    let pointsAwarded = 0;
    let isFirstCorrect = false;
    let correctAnswerIdx = -1;
    let explanationText = "";

    // 4. Handle "spin" game type (uses ScenarioQuestion & ScenarioMastery)
    if (gameType === 'spin') {
      const question = await prisma.scenarioQuestion.findUnique({
        where: { id: identifier }
      });
      if (!question) {
        return NextResponse.json({ error: 'Scenario question not found' }, { status: 404 });
      }

      isCorrect = chosenOptionIndex === question.correctAnswerIdx;
      correctAnswerIdx = question.correctAnswerIdx;
      explanationText = req.headers.get('accept-language')?.includes('hi')
        ? question.explanationHi
        : req.headers.get('accept-language')?.includes('ta')
          ? question.explanationTa
          : question.explanationEn;

      // Handle points and mastery transaction
      await prisma.$transaction(async (tx) => {
        // Log attempt
        await tx.quizAttempt.create({
          data: {
            userId: user.id,
            questionId: question.id,
            chosenIdx: chosenOptionIndex,
            isCorrect
          }
        });

        if (isCorrect) {
          try {
            // Attempt to insert ScenarioMastery to check if solved first-time
            await tx.scenarioMastery.create({
              data: {
                userId: user.id,
                questionId: question.id
              }
            });

            isFirstCorrect = true;
            pointsAwarded = 40; // 40 XP for first correct spin

            const profile = await tx.profile.findUnique({
              where: { userId: user.id }
            });
            if (profile) {
              const newPoints = profile.points + pointsAwarded;
              const newLevel = calculateLevel(newPoints);
              await tx.profile.update({
                where: { id: profile.id },
                data: { points: newPoints, level: newLevel }
              });
            }
          } catch (dbError: any) {
            // P2002 Unique constraint trigger (already mastered)
            isFirstCorrect = false;
            pointsAwarded = 0;
          }
        } else {
          // Pity XP: 10 XP for effort, but only on first attempt to prevent farming
          const existingAttempts = await tx.quizAttempt.findMany({
            where: { userId: user.id, questionId: question.id }
          });
          if (existingAttempts.length <= 1) { // Only first attempt gets pity XP
            pointsAwarded = 10;
            const profile = await tx.profile.findUnique({
              where: { userId: user.id }
            });
            if (profile) {
              const newPoints = profile.points + pointsAwarded;
              const newLevel = calculateLevel(newPoints);
              await tx.profile.update({
                where: { id: profile.id },
                data: { points: newPoints, level: newLevel }
              });
            }
          }
        }
      });
    } else {
      // 5. Handle other games (snakes, board, flashcards)
      // Check for special "completion" identifier (win bonus)
      if (identifier === 'completion') {
        isCorrect = true;
        correctAnswerIdx = 0;
        explanationText = "Congratulations on completing the game!";

        // Win bonuses: Snakes = 100, Board = 100
        const completionPoints = (gameType === 'snakes' || gameType === 'board') ? 100 : 0;

        // Try to locate a dummy GameContent record for completion to link it
        let completionContent = await prisma.gameContent.findFirst({
          where: { gameType, identifier: 'completion' }
        });

        // Auto-create dummy completion GameContent if missing
        if (!completionContent && completionPoints > 0) {
          completionContent = await prisma.gameContent.create({
            data: {
              gameType,
              identifier: 'completion',
              titleEn: 'Completion Bonus',
              titleHi: 'पूर्णता बोनस',
              titleTa: 'முழுமைப் போனஸ்',
              descriptionEn: 'Earned upon winning the game',
              descriptionHi: 'खेल जीतने पर अर्जित',
              descriptionTa: 'விளையாட்டை வெல்லும்போது கிடைக்கும்',
              questionEn: '',
              questionHi: '',
              questionTa: '',
              optionsEn: '[]',
              optionsHi: '[]',
              optionsTa: '[]',
              correctAnswerIdx: 0,
              points: completionPoints,
              explanationEn: '',
              explanationHi: '',
              explanationTa: ''
            }
          });
        }

        if (completionContent) {
          await prisma.$transaction(async (tx) => {
            // Log attempt
            await tx.gameAttempt.create({
              data: {
                userId: user.id,
                gameContentId: completionContent.id,
                chosenIdx: 0,
                isCorrect: true
              }
            });

            try {
              // Attempt to master the completion
              await tx.gameMastery.create({
                data: {
                  userId: user.id,
                  gameContentId: completionContent.id
                }
              });

              isFirstCorrect = true;
              pointsAwarded = completionPoints;

              const profile = await tx.profile.findUnique({
                where: { userId: user.id }
              });
              if (profile) {
                const newPoints = profile.points + pointsAwarded;
                const newLevel = calculateLevel(newPoints);
                await tx.profile.update({
                  where: { id: profile.id },
                  data: { points: newPoints, level: newLevel }
                });
              }
            } catch (dbError: any) {
              // Already completed
              isFirstCorrect = false;
              pointsAwarded = 0;
            }
          });
        }
      } else {
        // Standard game challenge verification
        const gameContent = await prisma.gameContent.findUnique({
          where: {
            gameType_identifier: { gameType, identifier }
          }
        });

        if (!gameContent) {
          return NextResponse.json({ error: 'Game content not found' }, { status: 404 });
        }

        isCorrect = chosenOptionIndex === gameContent.correctAnswerIdx;
        correctAnswerIdx = gameContent.correctAnswerIdx;
        explanationText = isCorrect
          ? (req.headers.get('accept-language')?.includes('hi')
              ? gameContent.explanationHi
              : req.headers.get('accept-language')?.includes('ta')
                ? gameContent.explanationTa
                : gameContent.explanationEn)
          : '';

        await prisma.$transaction(async (tx) => {
          // Log attempt
          await tx.gameAttempt.create({
            data: {
              userId: user.id,
              gameContentId: gameContent.id,
              chosenIdx: chosenOptionIndex,
              isCorrect
            }
          });

          if (isCorrect) {
            try {
              // Attempt to insert GameMastery to check if solved first-time
              await tx.gameMastery.create({
                data: {
                  userId: user.id,
                  gameContentId: gameContent.id
                }
              });

              isFirstCorrect = true;
              pointsAwarded = gameContent.points;

              const profile = await tx.profile.findUnique({
                where: { userId: user.id }
              });
              if (profile) {
                const newPoints = profile.points + pointsAwarded;
                const newLevel = calculateLevel(newPoints);
                await tx.profile.update({
                  where: { id: profile.id },
                  data: { points: newPoints, level: newLevel }
                });
              }
            } catch (dbError: any) {
              // Unique constraint violation (already solved)
              isFirstCorrect = false;
              pointsAwarded = 0;
            }
          }
        });
      }
    }

    // 6. Post-transaction badges update (runs outside of query lock)
    if (pointsAwarded > 0) {
      const freshUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: { profile: true }
      });
      if (freshUser && freshUser.profile) {
        await checkAndUnlockBadges(freshUser.profile.id, freshUser.profile.points);
      }
    }

    // 7. Fetch updated profile progress object
    const progress = await getUserProgressForUser(user.id);

    return NextResponse.json({
      isCorrect,
      correctAnswerIdx,
      pointsAwarded,
      isFirstCorrect,
      explanation: explanationText,
      progress
    });
  } catch (error: any) {
    console.error('POST /api/profile/game/verify error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
