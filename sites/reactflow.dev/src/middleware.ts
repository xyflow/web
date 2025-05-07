import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/auth-redirect'],
};

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth-redirect')) {
    const path = request.nextUrl.searchParams.get('path');
    const fallback = request.nextUrl.searchParams.get('fallback');

    const isProbablyAuthenticated = request.cookies.get('nhostRefreshToken');

    try {
      return isProbablyAuthenticated
        ? NextResponse.redirect(new URL(path, request.url))
        : NextResponse.redirect(
            new URL(fallback, request.headers.get('referer')),
          );
    } catch (err) {
      console.error(err);
    }
    return NextResponse.rewrite(new URL('/', request.url));
  }

  return NextResponse.next();
}
