'use server';

import { createNhostClient } from '../lib/nhost';

export async function signUp(formData: FormData, turnstileToken: string) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      error: 'Email and password fields are required',
    };
  }

  try {
    const nhost = await createNhostClient();
    const response = await nhost.auth.signUpEmailPassword(
      {
        email,
        password,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/pro`,
        },
      },
      {
        headers: {
          'x-cf-turnstile-response': turnstileToken,
        },
      },
    );

    const session = response.body?.session;

    // use encodeURIComponent because email can contain special characters such as +
    return {
      redirect: session ? '/pro/dashboard' : `/pro/email-verification?email=${encodeURIComponent(email)}`,
    };
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'body' in error) {
      console.error((error as { body: unknown }).body);
    }
    return {
      error: `An error occurred during sign up: ${error instanceof Error ? error.message : 'An error occurred'}`,
    };
  }
}
