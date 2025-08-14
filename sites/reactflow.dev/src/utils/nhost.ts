import { cookies } from 'next/headers';
import { NhostClient, NhostSession } from '@nhost/nhost-js';
import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { NHOST_SESSION_KEY } from '@/utils/nhost-utils';

export async function getNhost(
  $cookieStore?: RequestCookies | ReadonlyRequestCookies,
): Promise<NhostClient> {
  const cookieStore = $cookieStore ?? (await cookies());

  const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
    region: process.env.NEXT_PUBLIC_NHOST_REGION!,
    start: false,
    autoRefreshToken: false,
  });

  const sessionCookieValue = cookieStore.get(NHOST_SESSION_KEY)?.value;
  const initialSession: NhostSession = sessionCookieValue
    ? JSON.parse(atob(sessionCookieValue))
    : // auth.initWithSession` must be called even with `null`, otherwise will get an error from @nhost/hasura-auth-js - Auth interpreter not set
      null;
  await nhost.auth.initWithSession({ session: initialSession });

  return nhost;
}
