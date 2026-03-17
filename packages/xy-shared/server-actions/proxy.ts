import { NextRequest, NextResponse } from 'next/server';
import { handleNhostMiddleware } from '../lib/nhost';

const protectedRoutes = ['/pro/dashboard', '/pro/team', '/pro/account', '/pro/support'];

const redirectToDashboard = ['/pro/sign-in', '/pro/sign-up', '/pro/'];

export async function proxy(request: NextRequest) {
  // Handle Nhost authentication and token refresh
  // Always call this to ensure session is up-to-date
  // even for public routes, so that session changes are detected
  const response = NextResponse.next();
  const session = await handleNhostMiddleware(request, response);

  const path = request.nextUrl.pathname;

  if (protectedRoutes.includes(path)) {
    return !session
      ? NextResponse.redirect(new URL('/pro/sign-in', request.url))
      : response;
  }

  if (redirectToDashboard.includes(path)) {
    return session
      ? NextResponse.redirect(new URL('/pro/dashboard', request.url))
      : response;
  }

  return response;
}
