import { BaseLayout, Hero, PricingTable } from 'xy-ui';
import { SparklesIcon } from '@heroicons/react/24/outline';
import SubscribeSection from '@/components/subscribe-section';

export default function ReactFlowProPricing() {
  return (
    <BaseLayout>
      <Hero
        title="Pricing"
        subtitle="Your subscription goes directly towards the development and maintenance of React Flow and allows us to keep the library independent and open source."
        kicker="React Flow Pro"
        kickerIcon={SparklesIcon}
        align="center"
        showGradient
      />
      <PricingTable />
      <SubscribeSection
        btnLink={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}
        btnLabel="Sign Up Now"
      />
    </BaseLayout>
  );
}
