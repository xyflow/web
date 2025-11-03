'use server';

import { cookies } from 'next/headers';
import { getNhost } from '@/utils/nhost';
import { NHOST_REFRESH_KEY, NHOST_SESSION_KEY } from '@/utils/nhost-utils';

export async function signOut() {
  const nhost = await getNhost();
  const session = nhost.getUserSession();

  await nhost.auth.signOut({ refreshToken: session!.refreshToken });
  const cookieStore = await cookies();
  cookieStore.delete(NHOST_SESSION_KEY);
  cookieStore.delete(NHOST_REFRESH_KEY);
}
