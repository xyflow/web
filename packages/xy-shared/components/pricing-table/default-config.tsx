import { Link } from '../ui/link';
import { features } from './features';
import { prices } from './prices';

import { BillingInterval, Currency, PlanId, SubscriptionPlan } from './types';

export const StarterPlan: SubscriptionPlan = {
  id: PlanId.STARTER,
  label: 'Starter',
  description:
    'Best for start-ups and businesses who build commercial products with React Flow.',
  pricing: prices.starter,
  features: [
    features.reactFlowProExamples,
    features.prioritizedIssues,
    features.teamMembers1,
    features.mitLicense,
    features.reactFlowIntro,
  ],
  buttonLabel: 'Sign up',
  buttonLabelSignedIn: 'Subscribe',
};

export const ProPlan: SubscriptionPlan = {
  id: PlanId.PRO,
  label: 'Professional',
  description: 'Best for companies that want a direct wire to the React Flow team.',
  pricing: prices.pro,
  features: [
    features.reactFlowProExamples,
    features.prioritizedIssues,
    features.teamMembers5,
    features.mitLicense,
    features.proSupport,
    features.reactFlowIntro,
  ],
  highlighted: true,
  buttonLabel: 'Sign up',
  buttonLabelSignedIn: 'Subscribe',
};

export const EnterprisePlan: SubscriptionPlan = {
  id: PlanId.ENTERPRISE,
  label: 'Enterprise',
  description:
    'For large companies who want to have guidance and insights from the React Flow team.',

  features: [
    {
      label: (
        <span>
          Perpetual access to{' '}
          <Link variant="primary" href="https://reactflow.dev/pro/content">
            Pro Examples
          </Link>{' '}
          and{' '}
          <Link
            variant="primary"
            href="https://reactflow.dev/ui/templates/workflow-editor"
          >
            Templates
          </Link>
        </span>
      ),
    },
    features.prioritizedIssues,
    features.teamMembers10,
    features.mitLicense,
    features.enterpriseSupport,
    features.reactFlowIntro,
    features.customPayment,
  ],
  buttonVariant: 'secondary',
  buttonLabel: 'Request a Quote',
  buttonLabelSignedIn: 'Request a Quote',
};

export const SubscriptionPlans: SubscriptionPlan[] = [
  StarterPlan,
  ProPlan,
  EnterprisePlan,
];

export default SubscriptionPlans;
