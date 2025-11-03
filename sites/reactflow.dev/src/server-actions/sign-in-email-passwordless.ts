'use server';

import { getNhost } from '@/utils/nhost';

export async function signInEmailPasswordless(email: string) {
  const nhost = await getNhost();
  return nhost.auth.signInPasswordlessEmail({ email });
}
