import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthorizedUser } from '@/lib/auth-helpers';

export async function GET(req: Request) {
  try {
    // 1. Authenticate user
    const { errorResponse, user } = await getAuthorizedUser();
    if (errorResponse) return errorResponse;

    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'en';

    // 2. Fetch all paths, scenarios, and options from database
    const paths = await prisma.simulatorPath.findMany({
      include: {
        scenarios: {
          include: {
            options: {
              orderBy: {
                optionIndex: 'asc'
              }
            }
          }
        }
      }
    });

    // 3. Format paths, scenarios, and options, mapping fields to current user lang
    // and strictly obfuscating option point weights and explanations to prevent cheating.
    const formatted = paths.map(path => {
      const scenarios = path.scenarios.map(sc => {
        const options = sc.options.map(opt => {
          return {
            optionIndex: opt.optionIndex,
            text: lang === 'hi' 
              ? opt.textHi 
              : lang === 'ta' 
                ? opt.textTa 
                : opt.textEn
            // Strictly omit opt.points and opt.explanationEn/Hi/Ta
          };
        });

        return {
          id: sc.id,
          title: lang === 'hi' 
            ? sc.titleHi 
            : lang === 'ta' 
              ? sc.titleTa 
              : sc.titleEn,
          description: lang === 'hi' 
            ? sc.descriptionHi 
            : lang === 'ta' 
              ? sc.descriptionTa 
              : sc.descriptionEn,
          articleLinked: sc.articleLinked,
          options
        };
      });

      return {
        id: path.id,
        title: lang === 'hi' 
          ? path.titleHi 
          : lang === 'ta' 
            ? path.titleTa 
            : path.titleEn,
        levelRequired: path.levelRequired,
        scenarios
      };
    });

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error('GET /api/simulator/paths error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
