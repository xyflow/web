import { Link } from '../../../';

import {
  BillingInterval,
  Currency,
  FeatureConfig,
  PlanId,
  SubscriptionPlan,
} from './types';

const features: Record<string, FeatureConfig> = {
  proExamples: {
    label: (
      <span>
        Access to all{' '}
        <Link variant="primary" href="https://reactflow.dev/pro/examples">
          Pro Examples
        </Link>
      </span>
    ),
  },
  teamMembers1: {
    label: 'Invite 1 team member',
    description:
      'You can purchase additional seats through the platform as-needed.',
  },
  teamMembers5: {
    label: 'Invite 5 team members',
    description:
      'You can purchase additional seats through the platform as-needed.',
  },
  teamMembers10: {
    label: 'Invite 10 team members',
    description:
      'You can purchase additional seats through the platform as-needed.',
  },
  prioritizedIssues: {
    label: 'Prioritized Github Issues',
  },
  mitLicense: {
    label: 'Keep the library running and maintained under an MIT License',
  },
};

export const StarterPlan: SubscriptionPlan = {
  id: PlanId.STARTER,
  label: 'Starter',
  description:
    'Best for start-ups and businesses who build commercial products with React Flow.',
  pricing: [
    {
      currency: Currency.EUR,
      interval: BillingInterval.MONTH,
      label: '129€',
    },
    {
      currency: Currency.EUR,
      interval: BillingInterval.YEAR,
      label: '119€',
    },
    {
      currency: Currency.USD,
      interval: BillingInterval.MONTH,
      label: '$139',
    },
    {
      currency: Currency.USD,
      interval: BillingInterval.YEAR,
      label: '$129',
    },
    {
      currency: Currency.INR,
      interval: BillingInterval.MONTH,
      label: '₹2,700',
    },
    {
      currency: Currency.INR,
      interval: BillingInterval.YEAR,
      label: '₹2,475',
    },
  ],
  features: [
    features.proExamples,
    features.prioritizedIssues,
    features.teamMembers1,
    features.mitLicense,
  ],
};

export const ProPlan: SubscriptionPlan = {
  id: PlanId.PRO,
  label: 'Professional',
  description:
    'Best for companies that want a direct wire to the React Flow team.',
  pricing: [
    {
      currency: Currency.EUR,
      interval: BillingInterval.MONTH,
      label: '249€',
    },
    {
      currency: Currency.EUR,
      interval: BillingInterval.YEAR,
      label: '229€',
    },
    {
      currency: Currency.USD,
      interval: BillingInterval.MONTH,
      label: '$269',
    },
    {
      currency: Currency.USD,
      interval: BillingInterval.YEAR,
      label: '$249',
    },
    {
      currency: Currency.INR,
      interval: BillingInterval.MONTH,
      label: '₹22,300',
    },
    {
      currency: Currency.INR,
      interval: BillingInterval.YEAR,
      label: '₹20,000',
    },
  ],
  features: [
    features.proExamples,
    {
      label: (
        <span>
          Access to all{' '}
          <Link variant="primary" href="https://reactflow.dev/pro/templates">
            Pro Templates
          </Link>
        </span>
      ),
    },
    features.prioritizedIssues,
    features.teamMembers5,
    features.mitLicense,
    {
      label: 'Email Support',
    },
    {
      label: 'Introduction call with one of the creators of React Flow',
    },
  ],
  highlighted: true,
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
          Perpetual access to all{' '}
          <Link variant="primary" href="https://reactflow.dev/pro/examples">
            Pro Examples
          </Link>
        </span>
      ),
    },
    {
      label: (
        <span>
          Perpetual access to all{' '}
          <Link variant="primary" href="https://reactflow.dev/pro/templates">
            Pro Templates
          </Link>
        </span>
      ),
    },
    features.prioritizedIssues,
    features.teamMembers10,
    features.mitLicense,
    {
      label: 'Custom Support',
    },
    {
      label: 'Custom procurement and payment process',
    },
  ],
  buttonVariant: 'secondary',
  buttonLabel: 'Request a Quote',
};

export const SubscriptionPlans: SubscriptionPlan[] = [
  StarterPlan,
  ProPlan,
  EnterprisePlan,
];

export default SubscriptionPlans;
