'use server';

import { createNhostClient } from '../utils/nhost';

export async function signInEmailPasswordless(email: string) {
  const nhost = await createNhostClient();

  try {
    await nhost.auth.signInPasswordlessEmail({ email });
  } catch (error) {
    return { error: error.message };
  }

  return null;
}
