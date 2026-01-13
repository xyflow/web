'use server';

import { createNhostClient } from '../utils/nhost';

export async function resetPassword(email: string) {
  try {
    const nhost = await createNhostClient();
    await nhost.auth.sendPasswordResetEmail({ email });
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : 'An error occurred' };
  }

  return null;
}
