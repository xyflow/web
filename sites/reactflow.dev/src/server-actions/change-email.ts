'use server';

import { FetchError } from '@nhost/nhost-js/fetch';

import { getNhost } from '@/utils/nhost';

export async function changeEmail(
  newEmail: string,
): Promise<{ error: FetchError | null }> {
  const nhost = await getNhost();

  try {
    await nhost.auth.changeUserEmail({ newEmail });
  } catch (error) {
    return { error };
  }

  return { error: null };
}
