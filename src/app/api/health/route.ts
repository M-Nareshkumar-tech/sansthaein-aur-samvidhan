import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Perform a quick query to verify database is active
    await prisma.part.findFirst();
    return NextResponse.json({ status: 'healthy', database: 'connected' });
  } catch (error: any) {
    console.error("Health check database error:", error);
    return NextResponse.json({ status: 'unhealthy', error: error.message }, { status: 500 });
  }
}
