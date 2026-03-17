import { NextRequest, NextResponse } from 'next/server';
import { handleNhostMiddleware } from '../lib/nhost';

const protectedRoutes = ['pro/dashboard', 'pro/team', 'pro/account', 'pro/support'];

const redirectToDashboard = ['pro/sign-in', 'pro/sign-up', 'pro/'];

export async function proxy(request: NextRequest) {
  // Handle Nhost authentication and token refresh
  // Always call this to ensure session is up-to-date
  // even for public routes, so that session changes are detected
  const response = NextResponse.next();
  const session = await handleNhostMiddleware(request, response);

  const path = request.nextUrl.pathname;
  console.log('proxy for', path);

  const hasUserSession = session !== null;

  const isProtectedRoute = protectedRoutes.includes(path);

  if (isProtectedRoute) {
    return hasUserSession
      ? response
      : NextResponse.redirect(new URL('/pro/sign-in', request.url));
  }

  const isRedirectToDashboard = redirectToDashboard.includes(path);

  if (isRedirectToDashboard) {
    return hasUserSession
      ? NextResponse.redirect(new URL('/pro/dashboard', request.url))
      : response;
  }

  return response;
}
