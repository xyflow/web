import { NhostClient } from '@nhost/nhost-js';

export const nhost = new NhostClient({
  subdomain: process.env.NHOST_SUBDOMAIN,
  region: process.env.NHOST_REGION,
});

export async function createUser({ email }: { email: string }) {
  if (!email) {
    return false;
  }

  // use signIn instead of signUp because we don't want to set a password
  return await nhost.auth.signIn({ email });
}
