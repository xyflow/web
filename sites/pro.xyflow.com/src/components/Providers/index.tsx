import { type ReactNode } from 'react';

import NhostClientProvider from './NhostProvider';
import SubscriptionProvider from './SubscriptionProvider';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <NhostClientProvider>
      <SubscriptionProvider>{children}</SubscriptionProvider>
    </NhostClientProvider>
  );
}
