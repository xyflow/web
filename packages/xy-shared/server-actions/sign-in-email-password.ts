'use server';

import { createNhostClient } from '../utils/nhost';
import { FetchError } from '@nhost/nhost-js/fetch';
import { ErrorResponse } from '@nhost/nhost-js/auth';

export async function signIn(formData: FormData, redirectTo = '/pro/dashboard') {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      error: 'Email and password are required',
    };
  }

  try {
    const nhost = await createNhostClient();
    const response = await nhost.auth.signInEmailPassword({ email, password });

    if (response.body?.session) {
      return { redirect: redirectTo };
    } else {
      return {
        error: 'Failed to sign in. Please check your credentials.',
      };
    }
  } catch (error) {
    if (error.error === 'unverified-user') {
      // use encodeURIComponent because email can contain special characters such as +
      return { redirect: `/pro/email-verification?email=${encodeURIComponent(email)}` };
    } else {
      const _error = error as FetchError<ErrorResponse>;

      return {
        error: `An error occurred during sign in: ${_error.message}`,
      };
    }
  }
}
