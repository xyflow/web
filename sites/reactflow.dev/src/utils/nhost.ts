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
import { NextRequest, NextResponse } from 'next/server';

export async function getNhost(
  $cookieStore?: RequestCookies | ReadonlyRequestCookies,
): Promise<NhostClient> {
  const cookieStore = $cookieStore ?? (await cookies());

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
        cookieStore.set(NHOST_SESSION_KEY, JSON.stringify(value));
      },
      remove: () => {
        cookieStore.delete(NHOST_REFRESH_KEY);
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
        const raw = request.cookies.get(NHOST_SESSION_KEY)?.value || null;
        if (!raw) {
          return null;
        }
        const session = JSON.parse(raw) as Session;
        return session;
      },
      set: (value: Session) => {
        response.cookies.set({
          name: NHOST_SESSION_KEY,
          value: JSON.stringify(value),
          maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
          ...COOKIE_OPTIONS,
        });
      },
      remove: () => {
        response.cookies.delete(NHOST_SESSION_KEY);
      },
    },
  });

  // we only want to refresh the session if  the token will
  // expire in the next 60 seconds
  return await nhost.refreshSession(60);
}
