'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getNhost, NHOST_SESSION_KEY, NHOST_REFRESH_KEY } from '@/utils/nhost';

export async function signIn(formData: FormData, redirectTo = '/dashboard') {
  const nhost = await getNhost();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { session, error, ...args } = await nhost.auth.signIn({ email, password });
  console.log({ email, session, password, error, args });
  if (error) {
    if (error.error === 'unverified-user') {
      // use encodeURIComponent because email can contain special characters such as +
      redirect(`/email-verification?email=${encodeURIComponent(email)}`);
    }
    return error;
  }
  if (session) {
    const cookieStore = await cookies();
    cookieStore.set(NHOST_SESSION_KEY, btoa(JSON.stringify(session)), { path: '/' });
    if (session.refreshToken) {
      cookieStore.set(NHOST_REFRESH_KEY, session.refreshToken, { path: '/' });
      // Must set `nhostRefreshTokenExpiresAt`
      // https://github.com/nhost/nhost/blob/c0635ae1c7d5fe3bd889d11291ebc6978e866647/packages/hasura-auth-js/src/machines/authentication/machine.ts#L647C15-L649C81
      // const nextRefresh = new Date(Date.now() + session.accessTokenExpiresIn * 1_000)
      // const value = nextRefresh.toISOString();
      // console.log({value})
      // cookieStore.set(NHOST_JWT_EXPIRES_AT_KEY, nextRefresh.getTime(), { path: '/' })
    }
    redirect(redirectTo);
  }
}
