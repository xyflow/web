'use server';

import { createNhostClient } from '../lib/nhost';

export async function changeEmail(newEmail: string) {
  try {
    const nhost = await createNhostClient();
    await nhost.auth.changeUserEmail({ newEmail });
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : 'An error occurred' };
  }

  return null;
}
