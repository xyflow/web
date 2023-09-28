import { PricingTable } from 'xy-ui';
import { SparklesIcon } from '@heroicons/react/24/outline';
import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';
import Subscribe from '@/page-sections/subscribe';

export default function ReactFlowProPricing() {
  return (
    <BaseLayout>
      <Hero
        title="Pricing"
        subtitle="Your subscription goes directly towards the development and maintenance of React Flow and allows us to keep the library independent and open source."
        kicker="xyflow pro"
        kickerIcon={SparklesIcon}
        align="center"
        showGradient
      />
      <PricingTable />
      <Subscribe />
    </BaseLayout>
  );
}
