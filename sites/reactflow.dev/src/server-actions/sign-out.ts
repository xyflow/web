'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getNhost, NHOST_REFRESH_KEY, NHOST_SESSION_KEY } from '@/utils/nhost';

export async function signOut() {
  const nhost = await getNhost();

  await nhost.auth.signOut();
  const cookieStore = await cookies();
  cookieStore.delete(NHOST_SESSION_KEY);
  cookieStore.delete(NHOST_REFRESH_KEY);

  redirect('/');
}
