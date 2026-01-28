import { NextRequest, NextResponse } from 'next/server';
import { createNhostClient } from '../lib/nhost';

const protectedRoutes = ['dashboard', 'team', 'account', 'support', 'subscribe'];

export async function proxy(request: NextRequest) {
  // Handle Nhost authentication and token refresh
  // Always call this to ensure session is up-to-date
  // even for public routes, so that session changes are detected
  const nhost = await createNhostClient();
  // If no session and not a public route, redirect to signin
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`/pro/${route}`),
  );

  if (isProtectedRoute) {
    // user not logged in and trying to access a protected route
    if (!nhost.getUserSession()) {
      const signInUrl = new URL('/pro/sign-in', request.url);
      return NextResponse.redirect(signInUrl);
    }
    // user logged in and accessing a protected route
    return NextResponse.next();
  }

  if (nhost.getUserSession()) {
    // user logged in and accessing a public route, redirect to dashboard
    const dashboardUrl = new URL('/pro/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Every pro route except case-studies and quote-request
export const config = {
  matcher: ['/pro/:rest((?!case-studies(?:/|$))(?!quote-request(?:/|$)).*)'],
};
