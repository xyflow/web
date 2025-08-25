'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getNhost, NHOST_SESSION_KEY, NHOST_REFRESH_KEY } from '@/utils/nhost';

export async function signIn(formData: FormData, redirectTo = '/pro/dashboard') {
  const nhost = await getNhost();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { session, error } = await nhost.auth.signIn({ email, password });

  if (error) {
    if (error.error === 'unverified-user') {
      // use encodeURIComponent because email can contain special characters such as +
      redirect(`/pro/email-verification?email=${encodeURIComponent(email)}`);
    }
    return error;
  }
  if (session) {
    const cookieStore = await cookies();
    const exp = session?.accessTokenExpiresIn ?? 0;
    cookieStore.set({
      name: NHOST_SESSION_KEY,
      value: btoa(JSON.stringify(session)),
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: exp,
    });
    if (session.refreshToken) {
      cookieStore.set({
        name: NHOST_REFRESH_KEY,
        value: session.refreshToken,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });
    }
    redirect(redirectTo);
  }
}
