'use server';

import { ErrorResponse } from '@nhost/nhost-js/auth';
import { FetchError } from '@nhost/nhost-js/fetch';

import { getNhost } from '@/utils/nhost';

export async function changePassword(
  newPassword: string,
): Promise<FetchError<ErrorResponse> | null> {
  const nhost = await getNhost();

  try {
    await nhost.auth.changeUserPassword({ newPassword });
  } catch (error) {
    return error;
  }

  return null;
}
