import * as React from 'react';

import SubscriptionProvider from 'components/Providers/SubscriptionProvider';

function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return <SubscriptionProvider>{children}</SubscriptionProvider>;
}

export default DashboardTemplate;
