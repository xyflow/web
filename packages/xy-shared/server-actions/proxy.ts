import { NextRequest, NextResponse } from 'next/server';
import { createNhostClient } from '../lib/nhost';

// These are routes that are public but should be redirected to dashboard if user is logged in
const publicRoutes = ['sign-in', 'sign-up', 'reset-password', 'email-verification'];

export async function proxy(request: NextRequest) {
  // Handle Nhost authentication and token refresh
  // Always call this to ensure session is up-to-date
  // even for public routes, so that session changes are detected
  const nhost = await createNhostClient();
  // If no session and not a public route, redirect to signin
  const path = request.nextUrl.pathname;
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
