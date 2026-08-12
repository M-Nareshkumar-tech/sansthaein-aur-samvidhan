import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
    const { email, password, displayName, role } = await req.json();

    if (!email || !password || !displayName) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user and profile
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: role || 'CITIZEN',
        profile: {
          create: {
            displayName,
            languagePref: 'en',
            points: 0,
            level: 1
          }
        }
      },
      include: {
        profile: true
      }
    });

    // Create token
    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    // Set HttpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
