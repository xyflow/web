import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from '@xyflow/xy-ui';
import CustomerPortalButton from '@/components/pro/CustomerPortalButton';

function BillingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing & Subscription</CardTitle>
        <CardDescription>
          Open the Stripe customer portal to download your invoices, change your
          billing details and change or cancel your subscription plan.
        </CardDescription>
      </CardHeader>
      <CardFooter className="bg-muted">
        <CustomerPortalButton variant="react">
          Open Customer Portal
        </CustomerPortalButton>
      </CardFooter>
    </Card>
  );
}

export default BillingCard;
