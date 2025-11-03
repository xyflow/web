'use server';

import { getNhost } from '@/utils/nhost';

export async function changePassword(newPassword: string) {
  const nhost = await getNhost();
  return nhost.auth.changeUserPassword({ newPassword });
}
