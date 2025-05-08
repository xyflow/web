'use client';

import { FC, ReactNode } from 'react';
import { SubscriptionProvider } from './SubscriptionProvider';
import { NhostApolloProvider, NhostProvider } from './index.client';
import { NhostClient } from '@nhost/nhost-js';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
  // Change a storage type so we can parse cookies in RSC
  clientStorageType: 'cookie',
});

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <SubscriptionProvider>{children}</SubscriptionProvider>
      </NhostApolloProvider>
    </NhostProvider>
  );
};
