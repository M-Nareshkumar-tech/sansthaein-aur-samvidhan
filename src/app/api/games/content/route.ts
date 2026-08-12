import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const gameType = searchParams.get('gameType');
    const lang = searchParams.get('lang') || 'en';

    if (!gameType || !['snakes', 'board', 'flashcards'].includes(gameType)) {
      return NextResponse.json({ error: 'Invalid gameType parameter' }, { status: 400 });
    }

    const contents = await prisma.gameContent.findMany({
      where: { gameType },
      orderBy: { identifier: 'asc' }
    });

    // Format the items to return localized properties while obfuscating scoring properties
    const formatted = contents.map(item => {
      let title = item.titleEn;
      let description = item.descriptionEn;
      let question = item.questionEn;
      let options: string[] = [];

      // Select translation
      if (lang === 'hi') {
        title = item.titleHi || item.titleEn;
        description = item.descriptionHi || item.descriptionEn;
        question = item.questionHi || item.questionEn;
        try {
          options = JSON.parse(item.optionsHi);
        } catch {
          options = [];
        }
      } else if (lang === 'ta') {
        title = item.titleTa || item.titleEn;
        description = item.descriptionTa || item.descriptionEn;
        question = item.questionTa || item.questionEn;
        try {
          options = JSON.parse(item.optionsTa);
        } catch {
          options = [];
        }
      } else {
        try {
          options = JSON.parse(item.optionsEn);
        } catch {
          options = [];
        }
      }

      // Try to parse description as JSON (for flashcards comparison data)
      let comparisonDetails: any = null;
      if (gameType === 'flashcards') {
        try {
          comparisonDetails = JSON.parse(description);
        } catch {
          comparisonDetails = { description };
        }
      }

      return {
        id: item.id,
        identifier: item.identifier,
        title,
        description: comparisonDetails || description,
        question,
        options
      };
    });

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error('GET /api/games/content error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
