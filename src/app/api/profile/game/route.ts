import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  return NextResponse.json({
    error: 'This endpoint is deprecated. All game play progress scoring is now server-authoritative.'
  }, { status: 410 });
}
