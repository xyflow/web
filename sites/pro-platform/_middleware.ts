import { NextRequest, NextResponse } from 'next/server';
import { NhostClient, NHOST_REFRESH_TOKEN_KEY, NhostSession } from '@nhost/nhost-js';

const NHOST_SESSION_KEY = 'nhostSession';

export async function middleware(req: NextRequest) {
  const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
    region: process.env.NEXT_PUBLIC_NHOST_REGION,
    clientStorageType: 'custom',
    clientStorage: {
      getItem: (key) => {
        return req.cookies.get(key);
      },
      setItem: (key, value) => {
        return req.cookies.set(key, value);
      },
      removeItem: (key) => {
        return req.cookies.delete(key);
      },
    },
    autoSignIn: true,
    autoRefreshToken: false,
    start: false,
  });

  const sessionCookie = req.cookies.get(NHOST_SESSION_KEY);
  const refreshToken = req.cookies.get(NHOST_REFRESH_TOKEN_KEY);

  const initialSession: NhostSession = sessionCookie?.value &&
    refreshToken && { ...JSON.parse(sessionCookie.value), refreshToken };
  nhost.auth.client.start({ initialSession });

  // console.log('test', nhost.auth.client.interpreter);

  const isAuthenticated = await nhost.auth.isAuthenticatedAsync();

  console.log(isAuthenticated);
  // console.log(nhost.auth.isAuthenticated());
}

export default middleware;
