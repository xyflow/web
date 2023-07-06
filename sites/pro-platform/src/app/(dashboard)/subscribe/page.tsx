import StripePricingTable from '@/components/PricingTable';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent } from 'xy-ui';

export default function SubscribePage() {
  return (
    <div className="max-w-4xl mx-auto mb-20">
      <DashboardHeader
        title="Subscribe"
        description="Welcome to xyflow pro! With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />
      <Card>
        <CardContent className="px-4 pt-4 pb-0">
          <StripePricingTable />
        </CardContent>
      </Card>
    </div>
  );
}
