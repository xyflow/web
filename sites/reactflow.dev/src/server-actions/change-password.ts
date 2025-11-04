'use server';

import { getNhost } from '@/utils/nhost';
import { FetchError } from '@nhost/nhost-js/fetch';

export async function changePassword(
  newPassword: string,
): Promise<{ error: FetchError | null }> {
  const nhost = await getNhost();

  try {
    await nhost.auth.changeUserPassword({ newPassword });
  } catch (error) {
    return { error };
  }

  return { error: null };
}
