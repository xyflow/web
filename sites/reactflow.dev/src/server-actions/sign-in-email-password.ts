'use server';

import { redirect } from 'next/navigation';
import { FetchError } from '@nhost/nhost-js/fetch';
import { ErrorResponse } from '@nhost/nhost-js/auth';

import { getNhost } from '@/utils/nhost';

export async function signIn(
  formData: FormData,
  redirectTo = '/pro/dashboard',
): Promise<FetchError<ErrorResponse> | null> {
  const nhost = await getNhost();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  let redirectPath: string | null = null;

  try {
    const response = await nhost.auth.signInEmailPassword({ email, password });

    if (response.body?.session) {
      redirectPath = redirectTo;
    } else {
      return null;
    }
  } catch (error) {
    if (error.error === 'unverified-user') {
      // use encodeURIComponent because email can contain special characters such as +
      redirectPath = `/pro/email-verification?email=${encodeURIComponent(email)}`;
    } else {
      return error;
    }
  } finally {
    if (redirectPath) redirect(redirectPath);
  }

  return null;
}
