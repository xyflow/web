import { NextraMetadata } from 'nextra';
import { FAQ } from '../../../../components/faq';
import { default as reactFlowProFaqItems } from '../../../../components/faq/items/react-flow-pro';
import DashboardHeader from '../../../../components/pro/DashboardHeader';
import PricingTable from '../../../../components/pro/PricingTable';
import { requireSession } from '../../../../lib/nhost';

export const metadata: NextraMetadata = {
  asIndexPage: true,
};

export default async function SubscribePage() {
  await requireSession();
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
