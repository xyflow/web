export { proxy } from 'xy-shared/server-actions/proxy';

// Every pro route except case-studies and quote-request
export const config = {
  // matcher: ['/pro/:rest((?!case-studies(?:/|$))(?!quote-request(?:/|$)).*)'],
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
