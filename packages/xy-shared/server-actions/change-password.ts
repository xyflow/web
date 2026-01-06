'use server';

import { createNhostClient } from '../utils/nhost';

export async function changePassword(newPassword: string) {
  try {
    const nhost = await createNhostClient();
    await nhost.auth.changeUserPassword({ newPassword });
  } catch (error) {
    return { error: error.message };
  }

  return null;
}
