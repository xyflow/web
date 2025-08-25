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
    const response = NextResponse.redirect(url, {
      headers: {
        'x-middleware-cache': 'no-cache',
        'cache-control': 'no-store',
      },
    });
    // Prevent caching of this redirect so Set-Cookie is never shared between users
    // Set cookie via API to ensure proper serialization and merging
    const exp = newSession?.accessTokenExpiresIn ?? 0;
    response.cookies.set({
      name: NHOST_SESSION_KEY,
      value: btoa(JSON.stringify(newSession)),
      path: '/', // Explicitly makes the cookie available to all routes on your domain
      httpOnly: true, // JS can’t read cookies (prevents XSS stealing your tokens)
      secure: true, // Sent only over HTTPS
      sameSite: 'lax', // Prevents CSRF on cross-site POSTs, but still works for normal navigation
      maxAge: exp, // Aligns cookies with Nhost’s own token lifetimes
    });
    return response;
  }
}
