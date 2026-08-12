import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const organ = searchParams.get('organ')?.toUpperCase();
    const level = searchParams.get('level')?.toUpperCase();
    const search = searchParams.get('search');
    const lang = searchParams.get('lang') || 'en';

    // Construct Prisma query
    const where: any = {
      status: 'PUBLISHED',
    };

    if (organ && organ !== 'ALL') {
      where.organ = organ;
    }
    if (level && level !== 'ALL') {
      where.level = level;
    }

    if (search) {
      where.OR = [
        { articleNumber: { contains: search } },
        { title: { contains: search } },
        {
          translations: {
            some: {
              OR: [
                { rawText: { contains: search } },
                { simplifiedSummary: { contains: search } },
                { childFriendlySummary: { contains: search } }
              ]
            }
          }
        }
      ];
    }

    const articles = await prisma.article.findMany({
      where,
      include: {
        translations: {
          where: {
            language: lang
          }
        },
        scenarioQuestions: true
      },
      orderBy: {
        articleNumber: 'asc'
      }
    });

    // Format the articles to return a simple structure mapping to the language
    const formatted = articles.map(art => {
      const translation = art.translations[0] || null;
      let keyTakeaways = [];
      try {
        keyTakeaways = translation?.keyTakeaways ? JSON.parse(translation.keyTakeaways) : [];
      } catch (e) {
        console.error("Error parsing takeaways:", e);
      }

      // Find the appropriate scenario translations or options
      const formattedQuestions = art.scenarioQuestions.map(q => {
        let options = [];
        try {
          options = lang === 'hi' 
            ? JSON.parse(q.optionsHi) 
            : lang === 'ta' 
              ? JSON.parse(q.optionsTa) 
              : JSON.parse(q.optionsEn);
        } catch (e) {
          options = [];
        }

        return {
          id: q.id,
          question: lang === 'hi' ? q.questionTextHi : lang === 'ta' ? q.questionTextTa : q.questionTextEn,
          options,
          answerIndex: -1, // Obfuscated
          explanation: ""  // Obfuscated
        };
      });

      return {
        id: art.id,
        article_number: art.articleNumber,
        title: translation?.title || art.title,
        raw_text: translation?.rawText || '',
        simplified_summary: translation?.simplifiedSummary || '',
        child_friendly_summary: translation?.childFriendlySummary || '',
        key_takeaways: keyTakeaways,
        organ: art.organ.toLowerCase(),
        level: art.level.toLowerCase(),
        scenario_questions: formattedQuestions
      };
    });

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error("GET /api/articles error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
