'use server';

import { createNhostClient } from '../lib/nhost';

export async function changePassword(newPassword: string) {
  try {
    const nhost = await createNhostClient();
    await nhost.auth.changeUserPassword({ newPassword });
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : 'An error occurred' };
  }

  return null;
}
