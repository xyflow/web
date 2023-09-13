import CustomerPortalButton from '@/components/CustomerPortalButton';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from 'xy-ui';

export default function SubscribePage() {
  return (
    <div className="max-w-3xl">
      <DashboardHeader
        title="Billing"
        description="Welcome to xyflow pro! With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />
      <Card>
        <CardHeader>
          <CardTitle>Customer Portal</CardTitle>
          <CardDescription>
            We use Stripe to manage your subscription. Please open the customer portal to get access to your billing{' '}
          </CardDescription>
        </CardHeader>
        <CardFooter className="bg-muted">
          <CustomerPortalButton variant="react">Open Customer Portal</CustomerPortalButton>
        </CardFooter>
      </Card>
    </div>
  );
}
