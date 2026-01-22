'use server';

import { createNhostClient } from '../lib/nhost';

export async function getUser() {
  const nhost = await createNhostClient();
  return nhost.getUserSession()?.user;
}
