'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getNhost, NHOST_SESSION_KEY } from '@/utils/nhost';

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
  cookieStore.set(NHOST_SESSION_KEY, btoa(JSON.stringify(session)), { path: '/' });
  redirect('/pro/dashboard');
}
