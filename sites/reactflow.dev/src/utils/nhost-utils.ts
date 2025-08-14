import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

// If manually saved, e.g., in server actions
export const NHOST_SESSION_KEY = 'nhostSession';
// Saved by sign-in
export const NHOST_REFRESH_KEY = 'nhostRefreshToken';

export function prettifyError(
  error: { message: string } | { message: string }[],
): string {
  return 'message' in error ? error.message : error.map((e) => e.message).join('\n');
}

export const COOKIE_OPTIONS = {
  path: '/', // Explicitly makes the cookie available to all routes on your domain
  httpOnly: true, // JS can’t read cookies (prevents XSS stealing your tokens)
  secure: true, // Sent only over HTTPS
  sameSite: 'lax', // Prevents CSRF on cross-site POSTs, but still works for normal navigation
} satisfies Partial<ResponseCookie>;
