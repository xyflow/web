'use server';

import { getNhost } from '@/utils/nhost';

export async function changeEmail(newEmail: string) {
  const nhost = await getNhost();
  return nhost.auth.changeUserEmail({ newEmail });
}
