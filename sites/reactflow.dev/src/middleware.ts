import { NextRequest, NextResponse } from 'next/server';
import { createNhostClient } from 'xy-shared/lib/nhost';

export async function middleware(request: NextRequest) {
  // Handle Nhost authentication and token refresh
  // Always call this to ensure session is up-to-date
  // even for public routes, so that session changes are detected
  const nhost = await createNhostClient();
  // If no session and not a public route, redirect to signin
  if (!nhost.getUserSession()) {
    const signInUrl = new URL('/pro/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Session exists, allow access to protected route
  return NextResponse.next();
}

// Define which routes this middleware should run on
export const config = {
  matcher: [
    '/pro/dashboard/:path*',
    '/pro/team/:path*',
    '/pro/account/:path*',
    '/pro/support/:path*',
    '/pro/subscribe/:path*',
  ],
};
