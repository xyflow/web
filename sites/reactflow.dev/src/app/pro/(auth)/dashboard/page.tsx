import SubscriptionFeature from '@/components/pro/SubscriptionFeature';
import { SubscriptionPlan } from '@/types';
import DashboardHeader from '@/components/pro/DashboardHeader';
import { FC } from 'react';

const OverviewPage: FC = () => {
  return (
    <>
      <DashboardHeader title="Dashboard" showSubscriptionPlan />
      <div className="flex-1 space-y-7">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          <SubscriptionFeature
            title="Pro Examples"
            description="A continuously growing collection of advanced React Flow examples. During your subscription you can access the source code of all Pro examples."
            plans={[
              SubscriptionPlan.FREE,
              SubscriptionPlan.STARTER,
              SubscriptionPlan.PRO,
              SubscriptionPlan.ENTERPRISE,
              SubscriptionPlan.STUDENT,
              SubscriptionPlan.OSS,
            ]}
            button={{ label: 'Browse Examples', href: '/examples/pro' }}
          />

          <SubscriptionFeature
            title="Prioritized Github Issues"
            description="Your Github issues will be looked at first by our team. Drop us a message at info@xyflow.com with a link to your issue after creating it."
            plans={[
              SubscriptionPlan.STARTER,
              SubscriptionPlan.PRO,
              SubscriptionPlan.ENTERPRISE,
            ]}
            button={{
              label: 'Open Issue',
              href: 'https://github.com/xyflow/xyflow/issues/new/choose',
            }}
          />

          <SubscriptionFeature
            title="Invite Your Team"
            description="Invite your team members to grant them access to the Pro examples."
            plans={[
              SubscriptionPlan.STARTER,
              SubscriptionPlan.PRO,
              SubscriptionPlan.ENTERPRISE,
            ]}
            button={{ label: 'Invite Team', href: '/dashboard/team' }}
            requireAdminSubscription
          />

          <SubscriptionFeature
            title="Onboarding Call"
            description="Schedule a call with us to share what you're building with React Flow and how we can make the library even better."
            plans={[
              SubscriptionPlan.STARTER,
              SubscriptionPlan.PRO,
              SubscriptionPlan.ENTERPRISE,
            ]}
            button={{
              label: 'Schedule Call',
              href: 'https://cal.com/team/xyflow/onboarding-call',
            }}
            requireAdminSubscription
          />

          <SubscriptionFeature
            title="Individual Support"
            description="Your direct wire to the React Flow team. We will point you in the right direction if you encounter problems using React Flow."
            plans={[SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE]}
            button={{ label: 'Get Support', href: '/dashboard/support' }}
          />
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
