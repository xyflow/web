import { NextRequest, NextResponse } from 'next/server';
import { getNhost, NHOST_SESSION_KEY } from '@/utils/nhost';

export const config = {
  matcher: ['/auth-redirect'],
};

export async function middleware(request: NextRequest) {
  console.log('start middleware');

  const nhost = await getNhost(request.cookies);
  const session = nhost.auth.getSession();
  const url = new URL(request.url);
  const refreshToken = url.searchParams.get('refreshToken') ?? undefined;

  const currentTime = Math.floor(Date.now() / 1000);
  const tokenExpirationTime = nhost.auth.getDecodedAccessToken()?.exp;
  const accessTokenExpired =
    session && tokenExpirationTime && currentTime > tokenExpirationTime;

  if (accessTokenExpired || refreshToken) {
    const { session: newSession, error } = await nhost.auth.refreshSession(refreshToken);
    if (error) {
      return NextResponse.redirect(new URL('/pro/sign-in', request.url));
    }
    // remove the refreshToken from the url
    url.searchParams.delete('refreshToken');
    url.pathname = '/pro/dashboard';
    const exp = newSession?.accessTokenExpiresIn ?? 0;
    const response = NextResponse.redirect(url);
    // Prevent caching of this redirect so Set-Cookie is never shared between users
    response.headers.set('x-middleware-cache', 'no-cache');
    response.headers.set('cache-control', 'no-store');
    // Set cookie via API to ensure proper serialization and merging
    response.cookies.set({
      name: NHOST_SESSION_KEY,
      value: btoa(JSON.stringify(newSession)),
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: exp,
    });
    return response;
  }
}
