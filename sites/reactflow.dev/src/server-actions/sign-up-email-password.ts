'use server';

import { getNhost } from '@/utils/nhost';

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const nhost = await getNhost();
    const response = await nhost.auth.signUpEmailPassword({
      email,
      password,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/pro/email-verification/verify`,
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
    console.error(error);
    return { error: `An error occurred during sign up: ${error.message}` };
  }
}
