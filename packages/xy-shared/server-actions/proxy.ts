import { NextRequest, NextResponse } from 'next/server';
import { createNhostClient } from '../lib/nhost';

// Routes accessible to anyone — not redirected regardless of auth state
const universalRoutes = ['examples'];

// Routes that are public but redirect logged-in users to dashboard
const publicRoutes = ['sign-in', 'sign-up', 'reset-password', 'email-verification'];

export async function proxy(request: NextRequest) {
  // Handle Nhost authentication and token refresh
  // Always call this to ensure session is up-to-date
  // even for public routes, so that session changes are detected
  const nhost = await createNhostClient();
  const path = request.nextUrl.pathname;

  const isUniversalRoute = universalRoutes.some(
    (route) => path === `/pro/${route}` || path.startsWith(`/pro/${route}/`),
  );
  if (isUniversalRoute) {
    return NextResponse.next();
  }

  // If no session and not a public route, redirect to signin
  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(`/pro/${route}`),
  );
  const hasUserSession = nhost.getUserSession();

  if (!isPublicRoute) {
    return hasUserSession
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/pro/sign-in', request.url));
  }

  return hasUserSession
    ? NextResponse.redirect(new URL('/pro/dashboard', request.url))
    : NextResponse.next();
}
