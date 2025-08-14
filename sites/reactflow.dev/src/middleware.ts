import { NextRequest, NextResponse } from 'next/server';
import { getNhost } from '@/utils/nhost';
import {
  COOKIE_OPTIONS,
  NHOST_REFRESH_KEY,
  NHOST_SESSION_KEY,
} from '@/utils/nhost-utils';

export const config = {
  matcher: ['/auth-redirect'],
};

export async function middleware(request: NextRequest) {
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
    const response = NextResponse.redirect(url);
    // Prevent caching of this redirect so Set-Cookie is never shared between users
    // Set cookie via API to ensure proper serialization and merging
    const exp = newSession?.accessTokenExpiresIn ?? 0;
    response.cookies.set({
      name: NHOST_SESSION_KEY,
      value: btoa(JSON.stringify(newSession)),
      // maxAge: exp, // Aligns cookies with Nhost’s own token lifetimes
      ...COOKIE_OPTIONS,
    });
    if (newSession?.refreshToken) {
      response.cookies.set({
        name: NHOST_REFRESH_KEY,
        value: newSession.refreshToken,
        ...COOKIE_OPTIONS,
        // Nhost manages refresh token expiry server-side; do not set long maxAge unintentionally
      });
    }
    return response;
  }
}
