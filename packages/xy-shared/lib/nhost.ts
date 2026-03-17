import { cookies } from 'next/headers';
import { createServerClient, NhostClient } from '@nhost/nhost-js';
import { DEFAULT_SESSION_KEY as key, type Session } from '@nhost/nhost-js/session';

import { COOKIE_OPTIONS } from './nhost-utils';
import { NextRequest, NextResponse } from 'next/server';

// export async function createNhostClient(): Promise<NhostClient> {
//   const cookieStore = await cookies();

//   const nhost = createServerClient({
//     subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
//     region: process.env.NEXT_PUBLIC_NHOST_REGION!,
//     storage: {
//       get: (): Session | null => {
//         const raw = cookieStore.get(key)?.value || null;
//         if (!raw) {
//           return null;
//         }
//         const session = JSON.parse(raw) as Session;
//         return session;
//       },
//       set: (value: Session) => {
//         cookieStore.set(key, JSON.stringify(value), { ...COOKIE_OPTIONS });
//       },
//       remove: () => {
//         cookieStore.delete(key);
//       },
//     },
//   });

//   // this should only happen in non-RSC context
//   // RSC cannot update auth cookies on the client
//   // https://discord.com/channels/552499021260914688/1465638356833665159
//   await nhost.refreshSession(60);

//   return nhost;
// }

/**
 * Creates an Nhost client for use in server components.
 *
 * We rely on the vanilla createClient method from the Nhost JS SDK and a SessionStorage
 * customized to be able to retrieve the session from cookies in Next.js server components.
 */
export async function createNhostClient(): Promise<NhostClient> {
  const cookieStore = await cookies();

  const nhost = createServerClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
    region: process.env.NEXT_PUBLIC_NHOST_REGION!,
    storage: {
      // storage compatible with Next.js server components
      get: (): Session | null => {
        const s = cookieStore.get(key)?.value || null;
        if (!s) {
          return null;
        }
        const session = JSON.parse(s) as Session;
        return session;
      },
      set: (value: Session) => {
        cookieStore.set(key, JSON.stringify(value));
      },
      remove: () => {
        cookieStore.delete(key);
      },
    },
  });

  return nhost;
}

/**
 * Middleware function to handle Nhost authentication and session management.
 *
 * This function is designed to be used in Next.js middleware to manage user sessions
 * and refresh tokens. Refreshing the session needs to be done in the middleware
 * to ensure that the session is always up-to-date an accessible by both server and client components.
 *
 * @param {NextRequest} request - The incoming Next.js request object
 * @param {NextResponse} response - The outgoing Next.js response object
 */
export async function handleNhostMiddleware(
  request: NextRequest,
  response: NextResponse<unknown>,
): Promise<Session | null> {
  const nhost = createServerClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
    region: process.env.NEXT_PUBLIC_NHOST_REGION!,
    storage: {
      // storage compatible with Next.js middleware
      get: (): Session | null => {
        const raw = request.cookies.get(key)?.value || null;
        if (!raw) {
          return null;
        }
        const session = JSON.parse(raw) as Session;
        return session;
      },
      set: (value: Session) => {
        response.cookies.set({
          name: key,
          value: JSON.stringify(value),
          ...COOKIE_OPTIONS,
        });
      },
      remove: () => {
        response.cookies.delete(key);
      },
    },
  });

  // we only want to refresh the session if  the token will
  // expire in the next 60 seconds
  return await nhost.refreshSession(60);
}
