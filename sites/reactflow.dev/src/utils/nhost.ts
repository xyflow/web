import { cookies } from 'next/headers';
import { NhostClient, NhostSession } from '@nhost/nhost-js';
import { type NextRequest, NextResponse } from 'next/server';
import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

// If manually saved, e.g., in server actions
export const NHOST_SESSION_KEY = 'nhostSession';
// Saved by sign-in
export const NHOST_REFRESH_KEY = 'nhostRefreshToken';

export async function getNhost(
  cookieStore?: RequestCookies | ReadonlyRequestCookies,
): Promise<NhostClient> {
  cookieStore ??= await cookies();

  const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
    region: process.env.NEXT_PUBLIC_NHOST_REGION,
    start: false,
  });

  console.log('nhost', nhost);

  const sessionCookieValue = cookieStore.get(NHOST_SESSION_KEY)?.value;
  const initialSession: NhostSession = sessionCookieValue
    ? JSON.parse(atob(sessionCookieValue))
    : // auth.initWithSession` must be called even with `null`, otherwise will get an error from @nhost/hasura-auth-js - Auth interpreter not set
      null;

  console.log('try init session', initialSession);

  await nhost.auth.initWithSession({ session: initialSession });
  // const refreshTokenValue = cookieStore.get(NHOST_REFRESH_KEY)?.value;
  // if (refreshTokenValue) {
  //   const { error, session } = await nhost.auth.refreshSession(refreshTokenValue);
  //   if (error) {
  //     console.error(error);
  //   }
  // }
  return nhost;
}

export async function manageAuthSession(request: NextRequest) {
  console.log('start manageAuthSession');

  const nhost = await getNhost(request.cookies);

  console.log('nhost initialized', nhost);

  const session = nhost.auth.getSession();

  console.log('session retrieved', session);

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

export function prettifyError(
  error: { message: string } | { message: string }[],
): string {
  return 'message' in error ? error.message : error.map((e) => e.message).join('\n');
}
