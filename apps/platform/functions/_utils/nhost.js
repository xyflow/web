import { NhostClient } from '@nhost/nhost-js';

// @todo I think we can remove this entirely from the backend
export const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
});
