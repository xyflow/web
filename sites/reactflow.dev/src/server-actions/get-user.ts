'use server';

import { createNhostClient } from '@/utils/nhost';

export async function getUser() {
  const nhost = await createNhostClient();
  return nhost.getUserSession()?.user;
}
