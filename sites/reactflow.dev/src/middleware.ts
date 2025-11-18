import { NextRequest, NextResponse } from 'next/server';
import { handleNhostMiddleware } from '@/utils/nhost';

export async function middleware(request: NextRequest) {
  // Create a response that we'll modify as needed
  const response = NextResponse.next();

  // Handle Nhost authentication and token refresh
  // Always call this to ensure session is up-to-date
  // even for public routes, so that session changes are detected
  const session = await handleNhostMiddleware(request, response);

  // If no session and not a public route, redirect to signin
  if (!session) {
    const signInUrl = new URL('/pro/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Session exists, allow access to protected route
  return response;
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
