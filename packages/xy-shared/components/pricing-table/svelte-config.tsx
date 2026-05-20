import { Link } from '../ui/link';
import { features } from './features';
import { prices } from './prices';

import { PlanId, SubscriptionPlan } from './types';

export const StarterPlan: SubscriptionPlan = {
  id: PlanId.STARTER,
  label: 'Starter',
  description:
    'Best for start-ups and businesses who build commercial products with Svelte Flow.',
  pricing: prices.starter,
  features: [
    features.svelteFlowProExamples,
    features.prioritizedIssues,
    features.teamMembers1,
    features.mitLicense,
    features.svelteFlowIntro,
  ],
  buttonLabel: 'Sign up',
  buttonLabelSignedIn: 'Subscribe',
};

export const ProPlan: SubscriptionPlan = {
  id: PlanId.PRO,
  label: 'Professional',
  description: 'Best for companies that want a direct wire to the Svelte Flow team.',
  pricing: prices.pro,
  features: [
    features.svelteFlowProExamples,
    features.prioritizedIssues,
    features.teamMembers5,
    features.mitLicense,
    features.proSupport,
    features.svelteFlowIntro,
  ],
  highlighted: true,
  buttonLabel: 'Sign up',
  buttonLabelSignedIn: 'Subscribe',
};

export const EnterprisePlan: SubscriptionPlan = {
  id: PlanId.ENTERPRISE,
  label: 'Enterprise',
  description:
    'For large companies who want to have guidance and insights from the Svelte Flow team.',

  features: [
    {
      label: (
        <span>
          Perpetual access to{' '}
          <Link variant="primary" href="https://svelteflow.dev/pro/content">
            Pro Examples.
          </Link>
        </span>
      ),
    },
    features.prioritizedIssues,
    features.teamMembers10,
    features.mitLicense,
    features.enterpriseSupport,
    features.svelteFlowIntro,
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
