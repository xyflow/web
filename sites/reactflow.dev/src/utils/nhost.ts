import { cookies } from 'next/headers';
import { NhostClient, NhostSession } from '@nhost/nhost-js';
import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
// If manually saved, e.g., in server actions
export const NHOST_SESSION_KEY = 'nhostSession';
// Saved by sign-in
export const NHOST_REFRESH_KEY = 'nhostRefreshToken';

globalThis.fetch = (url, options) => {
  console.log('url', url);
  return fetch(url, {
    ...options,
    cache: 'no-store',
  });
};

export async function getNhost(
  cookieStore?: RequestCookies | ReadonlyRequestCookies,
): Promise<NhostClient> {
  cookieStore ??= await cookies();

  const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
    region: process.env.NEXT_PUBLIC_NHOST_REGION,
    start: false,
  });
  const sessionCookieValue = cookieStore.get(NHOST_SESSION_KEY)?.value;
  const initialSession: NhostSession = sessionCookieValue
    ? JSON.parse(atob(sessionCookieValue))
    : // auth.initWithSession` must be called even with `null`, otherwise will get an error from @nhost/hasura-auth-js - Auth interpreter not set
      null;
  await nhost.auth.initWithSession({ session: initialSession });
  return nhost;
}

export function prettifyError(
  error: { message: string } | { message: string }[],
): string {
  return 'message' in error ? error.message : error.map((e) => e.message).join('\n');
}
