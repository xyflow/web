import { Link } from '../link';

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
        Access to{' '}
        <Link variant="primary" href="https://reactflow.dev/pro/examples">
          Pro Examples
        </Link>{' '}
        and{' '}
        <Link
          variant="primary"
          href="https://reactflow.dev/components/templates/workflow-editor"
        >
          Templates
        </Link>
      </span>
    ),
  },
  teamMembers1: {
    label: 'Invite 1 team member',
    description: 'You can purchase additional seats through the platform as-needed.',
  },
  teamMembers5: {
    label: 'Invite 5 team members',
    description: 'You can purchase additional seats through the platform as-needed.',
  },
  teamMembers10: {
    label: 'Invite 10 team members',
    description: 'You can purchase additional seats through the platform as-needed.',
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
      label: '149€',
    },
    {
      currency: Currency.EUR,
      interval: BillingInterval.YEAR,
      label: '129€',
    },
    {
      currency: Currency.USD,
      interval: BillingInterval.MONTH,
      label: '$169',
    },
    {
      currency: Currency.USD,
      interval: BillingInterval.YEAR,
      label: '$149',
    },
    {
      currency: Currency.INR,
      interval: BillingInterval.MONTH,
      label: '₹7,500',
    },
    {
      currency: Currency.INR,
      interval: BillingInterval.YEAR,
      label: '₹7,000',
    },
  ],
  features: [
    features.proExamples,
    features.prioritizedIssues,
    features.teamMembers1,
    features.mitLicense,
  ],
  buttonLabel: 'Sign up',
  buttonLabelSignedId: 'Subscribe',
};

export const ProPlan: SubscriptionPlan = {
  id: PlanId.PRO,
  label: 'Professional',
  description: 'Best for companies that want a direct wire to the React Flow team.',
  pricing: [
    {
      currency: Currency.EUR,
      interval: BillingInterval.MONTH,
      label: '269€',
    },
    {
      currency: Currency.EUR,
      interval: BillingInterval.YEAR,
      label: '249€',
    },
    {
      currency: Currency.USD,
      interval: BillingInterval.MONTH,
      label: '$289',
    },
    {
      currency: Currency.USD,
      interval: BillingInterval.YEAR,
      label: '$269',
    },
    {
      currency: Currency.INR,
      interval: BillingInterval.MONTH,
      label: '₹24,000',
    },
    {
      currency: Currency.INR,
      interval: BillingInterval.YEAR,
      label: '₹22,000',
    },
  ],
  features: [
    features.proExamples,
    features.prioritizedIssues,
    features.teamMembers5,
    features.mitLicense,
    {
      label: 'Up to 1 hour of individual support via email per month',
    },
    {
      label: 'Introduction call with one of the creators of React Flow',
    },
  ],
  highlighted: true,
  buttonLabel: 'Sign up',
  buttonLabelSignedId: 'Subscribe',
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
          <Link variant="primary" href="https://reactflow.dev/pro/examples">
            Pro Examples
          </Link>{' '}
          and{' '}
          <Link
            variant="primary"
            href="https://reactflow.dev/components/templates/workflow-editor"
          >
            Templates
          </Link>
        </span>
      ),
    },
    features.prioritizedIssues,
    features.teamMembers10,
    features.mitLicense,
    {
      label: '1 hour of individual support via voice, video or email per month',
    },
    {
      label: 'Introduction call with one of the creators of React Flow',
    },
    {
      label: 'Custom procurement and payment process',
    },
  ],
  buttonVariant: 'secondary',
  buttonLabel: 'Request a Quote',
  buttonLabelSignedId: 'Request a Quote',
};

export const SubscriptionPlans: SubscriptionPlan[] = [
  StarterPlan,
  ProPlan,
  EnterprisePlan,
];

export default SubscriptionPlans;
