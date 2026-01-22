import { NextResponse, type NextRequest } from 'next/server';
import type { ErrorResponse } from '@nhost/nhost-js/auth';
import type { FetchError } from '@nhost/nhost-js/fetch';

import { createNhostClient } from 'xy-shared/lib/nhost';

const VERIFICATION_ERROR_PAGE = '/pro/email-verification/error';

export async function GET(request: NextRequest) {
  const refreshToken = request.nextUrl.searchParams.get('refreshToken');

  if (!refreshToken) {
    // Collect all query parameters for debugging
    const params = new URLSearchParams(request.nextUrl.searchParams);
    params.set('message', 'No refresh token provided');

    return NextResponse.redirect(
      new URL(`${VERIFICATION_ERROR_PAGE}?${params.toString()}`, request.url),
    );
  }

  try {
    const nhost = await createNhostClient();

    if (nhost.getUserSession()) {
      const params = new URLSearchParams(request.nextUrl.searchParams);
      params.set('message', 'Already signed in');

      return NextResponse.redirect(new URL('/pro/dashboard', request.url));
    }

    // Process the verification token
    await nhost.auth.refreshToken({ refreshToken });

    // Redirect to profile on successful verification
    return NextResponse.redirect(new URL('/pro/dashboard', request.url));
  } catch (err) {
    const error = err as FetchError<ErrorResponse>;
    const errorMessage = `Failed to verify token: ${error.message}`;

    // Collect all query parameters
    const params = new URLSearchParams(request.nextUrl.searchParams);
    params.set('message', errorMessage);

    return NextResponse.redirect(
      new URL(`${VERIFICATION_ERROR_PAGE}?${params.toString()}`, request.url),
    );
  }
}
