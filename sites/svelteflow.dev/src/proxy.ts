export { proxy } from 'xy-shared/server-actions/proxy';

// Every pro route except quote-request
export const config = {
  matcher: ['/pro/:rest((?!quote-request(?:/|$)).*)'],
};
