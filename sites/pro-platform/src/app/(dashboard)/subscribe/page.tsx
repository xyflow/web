import DashboardHeader from '@/components/DashboardHeader';
import PricingTable from '@/components/PricingTable';

export default function SubscribePage() {
  return (
    <>
      <DashboardHeader
        title="Subscribe"
        description="Welcome to xyflow pro! With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />
      <div>
        <PricingTable />
      </div>
    </>
  );
}
