import { NextRequest, NextResponse } from 'next/server';
import { handleNhostMiddleware } from '../lib/nhost';

const protectedRoutes = ['/pro/dashboard', '/pro/team', '/pro/account', '/pro/support'];

const redirectToDashboard = ['/pro/sign-in', '/pro/sign-up', '/pro/'];

export async function proxy(request: NextRequest) {
  const isSubrequest =
    request.headers.has('rsc') ||
    request.nextUrl.searchParams.has('_rsc') ||
    request.headers.has('next-router-prefetch') ||
    request.headers.get('purpose') === 'prefetch';

  if (isSubrequest) {
    return NextResponse.next();
  }

  // Handle Nhost authentication and token refresh
  // Always call this to ensure session is up-to-date
  // even for public routes, so that session changes are detected
  const response = NextResponse.next();
  let session = null;

  try {
    session = await handleNhostMiddleware(request, response);
  } catch (error) {
    console.error('Error handling Nhost middleware:', error);
    session = null;
  }

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
