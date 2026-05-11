import { Link } from '../ui/link';
import { features } from './features';

import { BillingInterval, Currency, PlanId, SubscriptionPlan } from './types';

export const StarterPlan: SubscriptionPlan = {
  id: PlanId.STARTER,
  label: 'Starter',
  description:
    'Best for start-ups and businesses who build commercial products with Svelte Flow.',
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
    features.svelteFlowProExamples,
    features.prioritizedIssues,
    features.teamMembers1,
    features.mitLicense,
  ],
  buttonLabel: 'Sign up',
  buttonLabelSignedIn: 'Subscribe',
};

export const ProPlan: SubscriptionPlan = {
  id: PlanId.PRO,
  label: 'Professional',
  description: 'Best for companies that want a direct wire to the Svelte Flow team.',
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
    features.svelteFlowProExamples,
    features.prioritizedIssues,
    features.teamMembers5,
    features.mitLicense,
    features.proSupport,
    {
      label: 'Introduction call with one of the creators of Svelte Flow',
    },
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
    {
      label: 'Introduction call with one of the creators of Svelte Flow',
    },
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
