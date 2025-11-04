'use server';

import { FetchError } from '@nhost/nhost-js/fetch';

import { getNhost } from '@/utils/nhost';
import { ErrorResponse } from '@nhost/nhost-js/auth';

export async function changeEmail(
  newEmail: string,
): Promise<FetchError<ErrorResponse> | null> {
  const nhost = await getNhost();

  try {
    await nhost.auth.changeUserEmail({ newEmail });
  } catch (error) {
    return error;
  }

  return null;
}
