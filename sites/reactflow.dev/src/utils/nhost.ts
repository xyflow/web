import { cookies } from 'next/headers';
import { createServerClient, NhostClient } from '@nhost/nhost-js';
import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import {
  COOKIE_OPTIONS,
  NHOST_REFRESH_KEY,
  NHOST_SESSION_KEY,
} from '@/utils/nhost-utils';
import { Session } from '@nhost/nhost-js/session';

export async function getNhost(
  $cookieStore?: RequestCookies | ReadonlyRequestCookies,
): Promise<NhostClient> {
  const cookieStore = $cookieStore ?? (await cookies());

  // const nhost = new NhostClient({
  //   subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
  //   region: process.env.NEXT_PUBLIC_NHOST_REGION!,
  //   start: false,
  //   autoRefreshToken: false,
  //   // Workaround to make the `NhostClient` instance always unique
  //   clientStorageType: 'custom',
  //   clientStorage: {
  //     getItem() {},
  //     setItem() {},
  //     removeItem() {},
  //   },
  // });

  const nhost = createServerClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
    region: process.env.NEXT_PUBLIC_NHOST_REGION!,
    storage: {
      get: (): Session | null => {
        const raw = cookieStore.get(NHOST_SESSION_KEY)?.value || null;
        if (!raw) {
          return null;
        }
        const session = JSON.parse(raw) as Session;
        return session;
      },
      set: (value: Session) => {
        cookieStore.set({
          name: NHOST_SESSION_KEY,
          value: JSON.stringify(value),
          ...COOKIE_OPTIONS,
        });
      },
      remove: () => {
        cookieStore.delete(NHOST_REFRESH_KEY);
      },
    },
  });

  // const sessionCookieValue = cookieStore.get(NHOST_SESSION_KEY)?.value;
  // // @ts-expect-error -- `auth.initWithSession` must be called even with `null`, otherwise will get an error from @nhost/hasura-auth-js - Auth interpreter not set
  // await nhost.auth.initWithSession({ session: parseSession(sessionCookieValue) });

  // const currentTime = Math.floor(Date.now() / 1000);
  // const tokenExpirationTime = nhost.auth.getDecodedAccessToken()?.exp;
  // const accessTokenExpired =
  //   sessionCookieValue && tokenExpirationTime && currentTime > tokenExpirationTime;
  // if (
  //   // no session cookie
  //   accessTokenExpired === undefined ||
  //   // have session cookie, but an access token expired
  //   accessTokenExpired === true
  // ) {
  //   const refreshToken = cookieStore.get(NHOST_REFRESH_KEY)?.value;
  //   if (refreshToken) {
  //     const { session: newSession, error } =
  //       await nhost.auth.refreshSession(refreshToken);
  //     if (error) {
  //       console.error(error);
  //     }
  //     if (newSession) {
  //       cookieStore.set({
  //         name: NHOST_SESSION_KEY,
  //         value: btoa(JSON.stringify(newSession)),
  //         ...COOKIE_OPTIONS,
  //       });
  //     }
  //   }
  // }

  return nhost;
}

// function parseSession(session?: string): NhostSession | null {
//   try {
//     return session ? JSON.parse(atob(session)) : null;
//   } catch {
//     return null;
//   }
// }
