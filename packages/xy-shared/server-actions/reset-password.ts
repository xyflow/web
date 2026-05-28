'use server';

import { createNhostClient } from '../lib/nhost';

export async function resetPassword(email: string, turnstileToken: string) {
  try {
    const nhost = await createNhostClient();
    await nhost.auth.sendPasswordResetEmail(
      { email, options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/pro` } },
      {
        headers: {
          'x-cf-turnstile-response': turnstileToken,
        },
      },
    );
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : 'An error occurred' };
  }

  return null;
}
