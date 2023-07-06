import DashboardHeader from '@/components/DashboardHeader';
import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from 'xy-ui';

export default function MembersPage() {
  return (
    <div className="max-w-4xl mx-auto mb-20">
      <DashboardHeader
        title="Billing"
        description="Welcome to xyflow pro! With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />
      <Card>
        <CardHeader>
          <CardTitle>Manage Team</CardTitle>
          <CardDescription>
            You can share your subscription with up to 3 team members. If you need more seats, please upgrade to a
            higher plan.
          </CardDescription>
        </CardHeader>
        <CardFooter className="bg-muted">
          <input className="rounded-lg px-4 py-2 border border-gray-300" type="email" />
          <Button className="ml-auto" variant="react">
            Add to Subscription
          </Button>
        </CardFooter>
        <CardFooter className="bg-muted">
          <input className="rounded-lg px-4 py-2 border border-gray-300" type="email" />
          <Button className="ml-auto" variant="react">
            Add to Subscription
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
