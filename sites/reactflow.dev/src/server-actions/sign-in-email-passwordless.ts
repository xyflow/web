'use server';

import { FetchError } from '@nhost/nhost-js/fetch';
import { ErrorResponse } from '@nhost/nhost-js/auth';

import { getNhost } from '@/utils/nhost';

export async function signInEmailPasswordless(
  email: string,
): Promise<FetchError<ErrorResponse> | null> {
  const nhost = await getNhost();

  try {
    await nhost.auth.signInPasswordlessEmail({ email });
  } catch (error) {
    return error;
  }

  return null;
}
