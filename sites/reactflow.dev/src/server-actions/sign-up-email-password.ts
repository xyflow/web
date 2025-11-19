'use server';

import { createNhostClient } from '@/utils/nhost';

const appUrl = process.env.APP_URL ? process.env.APP_URL : 'http://localhost:3002';

const redirectTo = `${appUrl}/pro/email-verification/verify`;

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      error: 'Email and password fields are required',
    };
  }

  console.log('signup', redirectTo);

  try {
    const nhost = await createNhostClient();
    const response = await nhost.auth.signUpEmailPassword({
      email,
      password,
      options: {
        redirectTo,
      },
    });
    const session = response.body?.session;

    // use encodeURIComponent because email can contain special characters such as +
    return {
      redirect: session
        ? '/pro/dashboard'
        : `/pro/email-verification?email=${encodeURIComponent(email)}`,
    };
  } catch (error) {
    console.error(error.body);
    return { error: `An error occurred during sign up: ${error.message}` };
  }
}
