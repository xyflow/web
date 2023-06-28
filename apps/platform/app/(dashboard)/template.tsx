import * as React from 'react';

import SubscriptionProvider from 'components/Providers/SubscriptionProvider';

export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return <SubscriptionProvider>{children}</SubscriptionProvider>;
}
