'use server';

import { getNhost } from '@/utils/nhost';

export async function getUser() {
  const nhost = await getNhost();
  return nhost.getUserSession()?.user;
}
