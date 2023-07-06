import SubscriptionFeature from '@/components/SubscriptionFeature';
import SubscriberSurvey from '@/components/SubscriberSurvey';
import { SubscriptionPlan } from '@/types';
import DashboardHeader from '@/components/DashboardHeader';

function OverviewPage() {
  return (
    <div className="max-w-4xl mx-auto mb-20">
      <DashboardHeader
        title="Overview"
        description="Welcome to xyflow pro! With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />
      <div className="flex-1 space-y-7">
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
          title="Email Support"
          description="Your direct wire to the React Flow team. We will try to point you in the right direction quickly if you encounter problems using React Flow."
          plans={[SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE]}
          button={{ label: 'Contact Support', href: 'mailto:support@reactflow.dev' }}
        />
        <SubscriptionFeature
          title="Video Support"
          description="Your direct wire to the React Flow team. We will try to point you in the right direction quickly if you encounter problems using React Flow."
          plans={[SubscriptionPlan.ENTERPRISE]}
          button={{ label: 'Contact Support', href: 'mailto:support@reactflow.dev' }}
        />
        <SubscriptionFeature
          title="Onboarding Call"
          description="We are interested to learn more about your project and what you are building with React Flow. You can schedule a call with us so that we can find out how we can make React Flow even better in the future."
          plans={[SubscriptionPlan.STARTER, SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE]}
          button={{ label: 'Schedule Call', href: 'https://cal.com/team/react-flow' }}
        />
        <SubscriberSurvey />
      </div>
    </div>
  );
}

export default OverviewPage;
