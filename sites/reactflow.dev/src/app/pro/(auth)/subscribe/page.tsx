import { FAQ, reactFlowProFaqItems } from 'xy-shared';
import DashboardHeader from 'xy-shared/components/pro/DashboardHeader';
import PricingTable from 'xy-shared/components/pro/PricingTable';
import { NextraMetadata } from 'nextra';

export const metadata: NextraMetadata = {
  asIndexPage: true,
};

export default function SubscribePage() {
  return (
    <>
      <DashboardHeader
        title="Subscribe"
        description="With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />

      <PricingTable />
      <FAQ className="mt-20" items={reactFlowProFaqItems} />
    </>
  );
}
