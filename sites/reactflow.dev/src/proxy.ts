import { NextRequest, NextResponse } from 'next/server';
import { handleNhostMiddleware } from '@/utils/nhost';

// Define public routes that don't require authentication
const privateRoute = ['/pro/dashboard'];

export async function proxy(request: NextRequest) {
  // Create a response that we'll modify as needed
  const response = NextResponse.next();

  // Get the current path
  const path = request.nextUrl.pathname;

  // Check if this is a public route or a public asset
  const isPrivateRoute = privateRoute.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );

  // Handle Nhost authentication and token refresh
  // Always call this to ensure session is up-to-date
  // even for public routes, so that session changes are detected
  const session = await handleNhostMiddleware(request, response);

  // If it's a public route, allow access without checking auth
  if (!isPrivateRoute) {
    return response;
  }

  // If no session and not a public route, redirect to signin
  if (!session) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Session exists, allow access to protected route
  return response;
}

// Define which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
