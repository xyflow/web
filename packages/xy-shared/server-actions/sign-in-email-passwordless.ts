'use server';

import { createNhostClient } from '../lib/nhost';

export async function signInEmailPasswordless(email: string) {
  const nhost = await createNhostClient();

  try {
    await nhost.auth.signInPasswordlessEmail({ email });
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : 'An error occurred' };
  }

  return null;
}
