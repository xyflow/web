import DashboardHeader from '@/components/DashboardHeader';
import PricingTable from '@/components/PricingTable';

export default function SubscribePage() {
  return (
    <div className="max-w-4xl mx-auto mb-20">
      <DashboardHeader
        title="Subscribe"
        description="Welcome to xyflow pro! With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />
      <div>
        <PricingTable />
      </div>
    </div>
  );
}
