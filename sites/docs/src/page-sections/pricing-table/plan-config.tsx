import Link from 'next/link';

import { PlanId, PricingPlan, PricingPlanFeature } from './types';

const features: Record<string, PricingPlanFeature> = {
  proExamples: {
    label: (
      <>
        Access to all <Link href="/react-flow/pro-examples">Pro Examples</Link>
      </>
    ),
    description:
      'A continuously growing collection of advanced React Flow examples. During your subscription you can access the source code of all Pro examples.',
    button: {
      label: 'Pro Examples',
      href: '/examples',
    },
  },
  prioritizedIssues: {
    label: 'Prioritized Github Issues',
    description:
      'Your Github issues will be looked at first by our team. Please drop us a message at info@reactflow.dev with a link to your issue after creating it.',
    button: {
      label: 'Open Github Issue',
      href: 'https://github.com/wbkd/react-flow/issues/new/choose',
      external: true,
    },
  },
  mitLicense: {
    label: 'Keep the library running and maintained under an MIT License',
    description: 'Keep the library running and maintained under an MIT License',
    button: {
      label: 'MIT License',
      href: 'https://github.com/wbkd/react-flow/blob/main/LICENSE',
      external: true,
    },
  },
};

// @todo use enum for the plan ids?
export const plans: Record<PlanId, PricingPlan> = {
  starter: {
    id: 'starter',
    label: 'Starter',
    description:
      'Best for start-ups and businesses who build commercial products with React Flow.',
    stripe: {
      product: {
        development: 'prod_LZarJ9FJt5xJA9',
        production: 'prod_LZcF1vMdzVf5PJ',
      },
      prices: {
        eur: {
          monthly: {
            label: '129€',
            unit: 'month',
            development: 'price_1KsRfaANIskB3EFJN4C6hMd6',
            production: 'price_1KsT0hANIskB3EFJyaqqNxBs',
          },
          yearly: {
            label: '119€',
            unit: 'month (billed annually)',
            development: 'price_1KsRfaANIskB3EFJmzNyioZN',
            production: 'price_1LzMLYANIskB3EFJsUorsRdb',
          },
        },
        usd: {
          monthly: {
            label: '$139',
            unit: 'month',
            development: 'price_1Kw155ANIskB3EFJqu0vSQa6',
            production: 'price_1Kw2taANIskB3EFJyMddjDbL',
          },
          yearly: {
            label: '$129',
            unit: 'month (billed annually)',
            development: 'price_1Kw1vqANIskB3EFJOUxjJG8o',
            production: 'price_1LzMJxANIskB3EFJayrPTV9l',
          },
        },
      },
    },
    features: [
      features.proExamples,
      features.prioritizedIssues,
      features.mitLicense,
    ],
  },
  pro: {
    id: 'pro',
    label: 'Pro',
    description:
      'Best for companies that want a direct wire to the React Flow team.',
    stripe: {
      product: {
        development: 'prod_LZasp8frEUTIfo',
        production: 'prod_LJufiCowlBDJ3F',
      },
      prices: {
        eur: {
          monthly: {
            label: '249€',
            unit: 'month',
            development: 'price_1KsRgWANIskB3EFJimmrTnHU',
            production: 'price_1KdGpwANIskB3EFJS8xzDSiO',
          },
          yearly: {
            label: '229€',
            unit: 'month (billed annually)',
            development: 'price_1KsRgWANIskB3EFJ0cbcqYsM',
            production: 'price_1LzMMmANIskB3EFJzcrGkrFK',
          },
        },
        usd: {
          monthly: {
            label: '$269',
            unit: 'month',
            development: 'price_1Kw2knANIskB3EFJ7town7cL',
            production: 'price_1Kw5xEANIskB3EFJcjU79l38',
          },
          yearly: {
            label: '$249',
            unit: 'month (billed annually)',
            development: 'price_1Kw2lDANIskB3EFJletdOo7W',
            production: 'price_1LzMNPANIskB3EFJagHt3j7P',
          },
        },
      },
    },
    features: [
      features.proExamples,
      features.prioritizedIssues,
      features.mitLicense,
      {
        label: (
          <>
            Up to 1 hour of{' '}
            <Link href="#accordion-button-faq-email">individual support</Link>{' '}
            via email per month
          </>
        ),
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
  },
  enterprise: {
    id: 'enterprise',
    label: 'Enterprise',
    description:
      'For large companies who want to have guidance and insights from the React Flow team.',
    features: [
      {
        label: (
          <>
            Perpetual access to all{' '}
            <Link href="/react-flow/pro-examples">Pro Examples</Link>
          </>
        ),
        description:
          'A continuously growing collection of advanced React Flow examples. During your subscription you can access the source code of all Pro examples.',
        button: {
          label: 'Pro Examples',
          href: '/examples',
        },
      },
      features.prioritizedIssues,
      features.mitLicense,
      {
        label: (
          <>
            1 hour of{' '}
            <Link href="#accordion-button-faq-email">individual support</Link>{' '}
            via voice, video or email per month
          </>
        ),
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
  },
};

export default plans;
