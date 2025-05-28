import { PricingTable } from '@xyflow/xy-ui';
import { BaseLayout, Hero, SubscribeSection } from 'xy-shared';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'React Flow Pro Pricing',
  description: 'Pricing plans for a React Flow Pro subscription.',
};

export default function ReactFlowProPricing() {
  return (
    <BaseLayout>
      <Hero
        title="Pricing"
        subtitle="Your subscription goes directly towards the development and maintenance of React Flow and allows us to keep the library independent and open source."
        kicker="React Flow Pro"
        kickerIcon={<SparklesIcon />}
        align="center"
        backgroundVariant="image"
      />
      <PricingTable />
      <SubscribeSection
        btnLink="/pro/signup"
        btnLabel="Sign Up Now"
      />
    </BaseLayout>
  );
}
