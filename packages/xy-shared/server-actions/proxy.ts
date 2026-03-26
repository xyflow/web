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
  const refreshSession = isDocumentNavigation(request);

  const response = NextResponse.next();

  let session = null;
  try {
    session = await handleNhostMiddleware(request, response, refreshSession);
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
