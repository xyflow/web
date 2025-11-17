import { cookies } from 'next/headers';
import { createServerClient, NhostClient } from '@nhost/nhost-js';
import { DEFAULT_SESSION_KEY, type Session } from '@nhost/nhost-js/session';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { COOKIE_OPTIONS } from '@/utils/nhost-utils';
import { NextRequest, NextResponse } from 'next/server';

const key = DEFAULT_SESSION_KEY;

export async function getNhost(
  $cookieStore?: RequestCookies | ReadonlyRequestCookies,
): Promise<NhostClient> {
  const cookieStore = $cookieStore ?? (await cookies());

  const nhost = createServerClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
    region: process.env.NEXT_PUBLIC_NHOST_REGION!,
    storage: {
      get: (): Session | null => {
        const raw = cookieStore.get(key)?.value || null;
        if (!raw) {
          return null;
        }
        const session = JSON.parse(raw) as Session;
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
    region: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'local',
    subdomain: process.env.NEXT_PUBLIC_NHOST_REGION || 'local',
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
          maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
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
