import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-samvidhan-key-2026';
const key = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPaths = ['/simulator', '/profile'];
  const educatorPaths = ['/educator'];
  const adminPaths = ['/admin', '/reviewer'];

  const session = request.cookies.get('session')?.value;

  const isProtected = protectedPaths.some(p => pathname.startsWith(p));
  const isEducatorOnly = educatorPaths.some(p => pathname.startsWith(p));
  const isAdminOnly = adminPaths.some(p => pathname.startsWith(p));

  if (isProtected || isEducatorOnly || isAdminOnly) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    try {
      const { payload } = await jwtVerify(session, key, {
        algorithms: ['HS256'],
      });
      
      const role = payload.role as string;

      if (isEducatorOnly && role !== 'EDUCATOR' && role !== 'PLATFORM_ADMIN') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
      }

      if (isAdminOnly && !['CONTENT_ADMIN', 'PLATFORM_ADMIN', 'CONTENT_REVIEWER'].includes(role)) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    } catch (error) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/simulator/:path*', '/profile/:path*', '/educator/:path*', '/admin/:path*', '/reviewer/:path*'],
};
