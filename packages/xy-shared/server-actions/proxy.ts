import { NextRequest, NextResponse } from 'next/server';
import { handleNhostMiddleware } from '../lib/nhost';

const protectedRoutes = ['/pro/dashboard', '/pro/team', '/pro/account', '/pro/support'];

const redirectToDashboard = ['/pro/sign-in', '/pro/sign-up', '/pro/'];

function isDocumentNavigation(req: NextRequest): boolean {
  const mode = req.headers.get('sec-fetch-mode');
  const dest = req.headers.get('sec-fetch-dest');

  return mode === 'navigate' && dest === 'document';
}

export async function proxy(request: NextRequest) {
  // Handle Nhost authentication and token refresh
  // Always call this to ensure session is up-to-date
  // even for public routes, so that session changes are detected

  const nextRouterPrefetch = request.headers.get('next-router-prefetch');
  const purpose = request.headers.get('purpose');
  const rsc = request.headers.get('rsc');
  const _rsc = request.headers.get('_rsc');
  const nextJsData = request.headers.get('x-nextjs-data');

  console.log(isDocumentNavigation(request));
  console.log({ nextRouterPrefetch, purpose, rsc, _rsc, nextJsData });

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
