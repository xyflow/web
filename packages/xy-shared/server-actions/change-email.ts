'use server';

import { createNhostClient } from '../utils/nhost';

export async function changeEmail(newEmail: string) {
  try {
    const nhost = await createNhostClient();
    await nhost.auth.changeUserEmail({ newEmail });
  } catch (error) {
    return { error: error.message };
  }

  return null;
}
