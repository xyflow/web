'use server';

import { getNhost } from '@/utils/nhost';

export async function resetPassword(email: string) {
  const nhost = await getNhost();
  return nhost.auth.resetPassword({ email });
}
