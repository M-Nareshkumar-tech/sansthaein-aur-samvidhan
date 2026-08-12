import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';

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
      // Consume centralized verifyToken helper which fails closed on missing secrets
      const payload = await verifyToken(session);
      if (!payload) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
      
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
