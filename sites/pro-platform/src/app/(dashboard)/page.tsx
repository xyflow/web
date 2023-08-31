import SubscriptionFeature from '@/components/SubscriptionFeature';
import { SubscriptionPlan } from '@/types';
import DashboardHeader from '@/components/DashboardHeader';
import Notification from '@/components/Notification';
import { Subscribed } from '@/components/SubscriptionStatus';

function OverviewPage() {
  return (
    <div className="max-w-7xl mx-auto mb-20">
      <DashboardHeader
        title="Overview"
        description="Welcome to xyflow pro! With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
        showSubscriptionPlan
      />
      <div className="flex-1 space-y-7">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          <SubscriptionFeature
            title="Pro Examples"
            description="A continuously growing collection of advanced React Flow examples. During your subscription you can access the source code of all Pro examples."
            plans={[SubscriptionPlan.STARTER, SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE]}
            button={{ label: 'Browse Examples', href: '/examples' }}
          />
          <SubscriptionFeature
            title="Prioritized Github Issues"
            description="Your Github issues will be looked at first by our team. Please drop us a message at info@reactflow.dev with a link to your issue after creating it."
            plans={[SubscriptionPlan.STARTER, SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE]}
            button={{ label: 'Open Issue', href: 'https://github.com/wbkd/react-flow/issues/new/choose' }}
          />
          <SubscriptionFeature
            title="Invite Your Team"
            description="You can invite your team members to your subscription. They will be able to access all pro features as well."
            plans={[SubscriptionPlan.STARTER, SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE]}
            button={{ label: 'Invite Team', href: '/team' }}
            requireUserSubscription
          />
          <SubscriptionFeature
            title="Onboarding Call"
            description="We are interested to learn more about your project and what you are building with React Flow. You can schedule a call with us so that we can find out how we can make React Flow even better in the future."
            plans={[SubscriptionPlan.STARTER, SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE]}
            button={{ label: 'Schedule Call', href: 'https://cal.com/team/react-flow' }}
            requireUserSubscription
          />
          <SubscriptionFeature
            title="Email Support"
            description="Your direct wire to the React Flow team. We will try to point you in the right direction quickly if you encounter problems using React Flow."
            plans={[SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE]}
            button={{ label: 'Contact Support', href: 'mailto:support@reactflow.dev' }}
          />
          <SubscriptionFeature
            title="Video Support"
            description="Your direct wire to the React Flow team. We will try to point you in the right direction quickly if you encounter problems using React Flow."
            plans={[SubscriptionPlan.ENTERPRISE]}
            button={{ label: 'Schedule Support Call', href: 'https://cal.com/team/react-flow' }}
          />
        </div>

        <Subscribed>
          <Notification
            description="We want to learn more about how you're using React Flow Pro."
            button={{ href: 'https://ndmj05829wa.typeform.com/to/lWoYgbVK', label: 'Answer 3 questions for us' }}
          />
        </Subscribed>
      </div>
    </div>
  );
}

export default OverviewPage;
