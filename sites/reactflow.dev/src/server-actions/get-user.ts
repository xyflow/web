'use server'

import { getNhost } from '@/utils/nhost';

export async function getUser() {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  return user
}
