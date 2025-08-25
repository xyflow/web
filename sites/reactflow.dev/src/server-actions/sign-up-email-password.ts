'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getNhost, NHOST_REFRESH_KEY, NHOST_SESSION_KEY } from '@/utils/nhost';

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const nhost = await getNhost();
  const { session, error } = await nhost.auth.signUp({ email, password });

  if (error) {
    return error;
  }

  if (!session) {
    // use encodeURIComponent because email can contain special characters such as +
    redirect(`/pro/email-verification?email=${encodeURIComponent(email)}`);
  }

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
  redirect('/pro/dashboard');
}
