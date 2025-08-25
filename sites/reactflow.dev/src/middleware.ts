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
    return NextResponse.redirect(url, {
      headers: {
        'Set-Cookie': [
          `${NHOST_SESSION_KEY}=${btoa(JSON.stringify(newSession))}`, // Overwrite the session cookie with the new session
          'Path=/', // Explicitly makes the cookie available to all routes on your domain
          'HttpOnly', // JS can’t read cookies (prevents XSS stealing your tokens)
          'Secure', // Sent only over HTTPS
          'SameSite=Lax', // Prevents CSRF on cross-site POSTs, but still works for normal navigation
          `Max-Age=${exp}`, // Aligns cookies with Nhost’s own token lifetimes
        ].join('; '),
      },
    });
  }
}
