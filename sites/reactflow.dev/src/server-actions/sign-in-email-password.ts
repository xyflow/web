'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FetchError } from '@nhost/nhost-js/fetch';
import { ErrorResponse } from '@nhost/nhost-js/auth';

import { getNhost } from '@/utils/nhost';
import {
  NHOST_SESSION_KEY,
  NHOST_REFRESH_KEY,
  COOKIE_OPTIONS,
} from '@/utils/nhost-utils';

export async function signIn(
  formData: FormData,
  redirectTo = '/pro/dashboard',
): Promise<FetchError<ErrorResponse> | null> {
  const nhost = await getNhost();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await nhost.auth.signInEmailPassword({ email, password });
    const session = response.body?.session;

    if (session) {
      const cookieStore = await cookies();
      const exp = session?.accessTokenExpiresIn ?? 0;
      const sessionValue = btoa(JSON.stringify(session));
      cookieStore.set({
        name: NHOST_SESSION_KEY,
        value: sessionValue,
        ...COOKIE_OPTIONS,
        // maxAge: exp,
      });
      if (session.refreshToken) {
        cookieStore.set({
          name: NHOST_REFRESH_KEY,
          value: session.refreshToken,
          ...COOKIE_OPTIONS,
        });
      }
      redirect(redirectTo);
    }

    return null;
  } catch (error) {
    if (error.error === 'unverified-user') {
      // use encodeURIComponent because email can contain special characters such as +
      redirect(`/pro/email-verification?email=${encodeURIComponent(email)}`);
    }
    return error;
  }
}
