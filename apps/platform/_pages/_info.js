import React from 'react';

import PricingFAQ from '../components/PricingFAQ';
import ContentPage from '../components/ContentPage';

export default function InfoPage() {
  return (
    <ContentPage title="Frequently Asked Questions">
      <PricingFAQ showTitle={false} />
    </ContentPage>
  );
}
