import { NextRequest, NextResponse } from 'next/server';
import { manageAuthSession } from '@/utils/nhost';

export const config = {
  matcher: ['/auth-redirect'],
};

export async function middleware(request: NextRequest) {
  return manageAuthSession(request, () =>
    NextResponse.redirect(new URL('/auth/signin', request.url)),
  );
}
