'use server';

import { FetchError } from '@nhost/nhost-js/fetch';

import { getNhost } from '@/utils/nhost';

export async function signInEmailPasswordless(
  email: string,
): Promise<{ error: FetchError | null }> {
  const nhost = await getNhost();

  try {
    await nhost.auth.signInPasswordlessEmail({ email });
  } catch (error) {
    return { error };
  }

  return { error: null };
}
