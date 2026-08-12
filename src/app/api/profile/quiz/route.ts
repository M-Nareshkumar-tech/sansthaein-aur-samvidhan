import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, getUserProgressForUser, calculateLevel, checkAndUnlockBadges } from '@/lib/api-helpers';

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !user.profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { articleNum, quizId, correct } = await req.json();
    if (!articleNum || !quizId || typeof correct !== 'boolean') {
      return NextResponse.json({ error: 'articleNum, quizId and correct status are required' }, { status: 400 });
    }

    // Find the scenario question in the DB by referencing the article number
    const scenario = await prisma.scenarioQuestion.findFirst({
      where: {
        article: {
          articleNumber: articleNum
        }
      }
    });

    if (!scenario) {
      return NextResponse.json({ error: 'Scenario question not found for article' }, { status: 404 });
    }

    // Create the attempt record
    await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        questionId: scenario.id,
        chosenIdx: correct ? scenario.correctAnswerIdx : -1,
        isCorrect: correct
      }
    });

    // Award XP if correct
    if (correct) {
      const newPoints = user.profile.points + 25;
      const newLevel = calculateLevel(newPoints);

      await prisma.profile.update({
        where: { id: user.profile.id },
        data: {
          points: newPoints,
          level: newLevel
        }
      });

      await checkAndUnlockBadges(user.profile.id, newPoints);
    }

    const progress = await getUserProgressForUser(user.id);
    return NextResponse.json(progress);
  } catch (error: any) {
    console.error("POST /api/profile/quiz error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
