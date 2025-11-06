'use server';

import { redirect } from 'next/navigation';
import { FetchError } from '@nhost/nhost-js/fetch';
import { ErrorResponse } from '@nhost/nhost-js/auth';

import { getNhost } from '@/utils/nhost';

export async function signUp(
  formData: FormData,
): Promise<FetchError<ErrorResponse> | null> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  let redirectPath: string | null = null;

  try {
    const nhost = await getNhost();
    const response = await nhost.auth.signUpEmailPassword({ email, password });
    const session = response.body?.session;

    if (!session) {
      // use encodeURIComponent because email can contain special characters such as +
      redirectPath = `/pro/email-verification?email=${encodeURIComponent(email)}`;
    }

    redirectPath = '/pro/dashboard';
  } catch (error) {
    return error;
  } finally {
    if (redirectPath) redirect(redirectPath);
  }

  return null;
}
