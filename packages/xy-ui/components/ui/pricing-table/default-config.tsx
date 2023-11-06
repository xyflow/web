import { Link } from '@xyflow/xy-ui';

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
        <Link variant="primary" href="/pro/examples">
          Pro Examples
        </Link>
      </span>
    ),
    description:
      'A continuously growing collection of advanced React Flow examples. During your subscription you can access the source code of all Pro examples.',
    button: {
      label: 'Pro Examples',
      href: '/pro/examples',
    },
  },
  prioritizedIssues: {
    label: 'Prioritized Github Issues',
    description:
      'Your Github issues will be looked at first by our team. Please drop us a message at info@reactflow.dev with a link to your issue after creating it.',
    button: {
      label: 'Open Github Issue',
      href: 'https://github.com/xyflow/xyflow/issues/new/choose',
      external: true,
    },
  },
  mitLicense: {
    label: 'Keep the library running and maintained under an MIT License',
    description: 'Keep the library running and maintained under an MIT License',
    button: {
      label: 'MIT License',
      href: 'https://github.com/xyflow/xyflow/blob/main/LICENSE',
      external: true,
    },
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
  ],
  features: [
    features.proExamples,
    features.prioritizedIssues,
    features.mitLicense,
  ],
};

export const ProPlan: SubscriptionPlan = {
  id: PlanId.PRO,
  label: 'Premium',
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
  ],
  features: [
    features.proExamples,
    features.prioritizedIssues,
    features.mitLicense,
    {
      label: 'Up to 1 hour of individual support via email per month',
      description:
        'Your direct wire to the React Flow team. We will try to point you in the right direction quickly if you encounter problems using React Flow.',
      button: {
        label: 'Contact Support',
        href: 'mailto:support@reactflow.dev',
        external: true,
      },
    },
    {
      label: 'Introduction call with one of the creators of React Flow',
      description:
        'We are interested to learn more about your project and what you are building with React Flow. You can schedule a call with us so that we can find out how we can make React Flow even better in the future.',
      button: {
        label: 'Schedule Call',
        href: 'https://cal.com/team/react-flow',
        external: true,
      },
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
          <Link variant="primary" href="/pro/examples">
            Pro Examples
          </Link>
        </span>
      ),
      description:
        'A continuously growing collection of advanced React Flow examples. During your subscription you can access the source code of all Pro examples.',
      button: {
        label: 'Pro Examples',
        href: '/pro/examples',
      },
    },
    features.prioritizedIssues,
    features.mitLicense,
    {
      label: '1 hour of individual support via voice, video or email per month',
      description:
        'Your direct wire to the React Flow team. We will try to point you in the right direction quickly if you encounter problems using React Flow.',
      button: {
        label: 'Contact Support',
        href: 'mailto:support@reactflow.dev',
        external: true,
      },
    },
    {
      label: 'Custom procurement and payment process',
      description:
        'We will sign up for your vendor portal and support payment via bank transfer and PO.',
      button: {
        label: 'Contact Us',
        href: 'mailto:info@reactflow.dev',
        external: true,
      },
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
