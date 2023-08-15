import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/auth-redirect'],
};

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth-redirect')) {
    const searchParams = new URLSearchParams(request.nextUrl.search);

    const path = searchParams.get('path');
    const fallback = searchParams.get('fallback');

    const isAuthenticated = request.cookies.get('nhostRefreshToken');

    try {
      return isAuthenticated ? NextResponse.rewrite(new URL(path, request.url)) : NextResponse.redirect(fallback);
    } catch (err) {
      console.log(err);
    }
    return NextResponse.rewrite(new URL('/', request.url));
  }

  return NextResponse.next();
}
