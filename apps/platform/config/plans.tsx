import NextLink from 'next/link';

export enum PlanId {
  FREE = 'free',
  STARTER = 'starter',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
  STUDENT = 'student',
  OSS = 'oss',
}

export enum Currency {
  EUR = 'eur',
  USD = 'usd',
}

export enum BillingPeriod {
  MONTHLY = 'monthly',
  ANNUALLY = 'annually',
}

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export type PricingPlanFeature = {
  label: React.ReactNode;
  description: React.ReactNode;
  button: {
    label: string;
    href: string;
    external?: boolean;
  };
};

export type PriceConfig = {
  label: string;
  unit: string;
} & Record<Environment, string>;

export type SubscriptionConfig = Record<BillingPeriod, PriceConfig>;

export type StripeConfig = {
  product: Record<Environment, string>;
  prices: Record<Currency, SubscriptionConfig>;
};

export type PricingPlan = {
  order: number;
  id: string;
  label: string;
  description: string;
  color: string;
  linkColor: string;
  borderColor: string;
  features: PricingPlanFeature[];
  stripe?: StripeConfig;
};

const features: Record<string, PricingPlanFeature> = {
  proExamples: {
    label: (
      <>
        Access to all <NextLink href="/pro-examples">Pro Examples</NextLink>
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
  free: {
    order: 0,
    id: 'free',
    label: 'Free',
    description: 'Best for individuals and non-commercial projects.',
    color: 'gray',
    linkColor: 'pink',
    borderColor: 'gray',
    features: [
      {
        label: (
          <>
            Use React Flow for free under the{' '}
            <NextLink href="https://github.com/wbkd/react-flow/blob/main/LICENSE">MIT License</NextLink>
          </>
        ),
        description: 'React Flow is open source.',
        button: {
          label: 'Getting started',
          href: 'https://reactflow.dev/docs/getting-started/installation',
          external: true,
        },
      },
      {
        label: 'Join the community Discord channel',
        description:
          'The React Flow Discord Server is the best place to get in touch with other developers and to get help from the community if you are stuck.',
        button: { label: 'Join Discord', href: 'https://discord.gg/Bqt6xrs', external: true },
      },
    ],
  },
  starter: {
    order: 2,
    id: 'starter',
    label: 'Starter',
    description: 'Best for start-ups and businesses who build commercial products with React Flow.',
    color: 'pink',
    linkColor: 'pink',
    borderColor: 'pink',
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
          annually: {
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
          annually: {
            label: '$129',
            unit: 'month (billed annually)',
            development: 'price_1Kw1vqANIskB3EFJOUxjJG8o',
            production: 'price_1LzMJxANIskB3EFJayrPTV9l',
          },
        },
      },
    },
    features: [features.proExamples, features.prioritizedIssues, features.mitLicense],
  },
  pro: {
    order: 3,
    id: 'pro',
    label: 'Pro',
    description: 'Best for companies that want a direct wire to the React Flow team.',
    color: 'purple',
    linkColor: 'purple',
    borderColor: 'purple',
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
          annually: {
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
          annually: {
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
            Up to 1 hour of <NextLink href="#accordion-button-faq-email">individual support</NextLink> via email per
            month
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
    order: 4,
    id: 'enterprise',
    label: 'Enterprise',
    description: 'For large companies who want to have guidance and insights from the React Flow team.',
    color: 'orange',
    borderColor: 'orange',
    linkColor: 'orange',
    features: [
      {
        label: (
          <>
            Perpetual access to all <NextLink href="/pro-examples">Pro Examples</NextLink>
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
            1 hour of <NextLink href="#accordion-button-faq-email">individual support</NextLink> via voice, video or
            email per month
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
        description: 'We will sign up for your vendor portal and support payment via bank transfer and PO.',
        button: {
          label: 'Contact Us',
          href: 'mailto:info@reactflow.dev',
          external: true,
        },
      },
    ],
  },
  student: {
    order: 1,
    id: 'student',
    label: 'Student',
    description: 'React Flow Pro for students',
    color: 'orange',
    borderColor: 'orange',
    linkColor: 'orange',
    features: [
      {
        label: (
          <>
            Access to <NextLink href="/pro-examples">Pro Examples</NextLink> for your university project
          </>
        ),
        description:
          'You can access the source code and guides of all Pro examples for usage in your university project.',
        button: {
          label: 'Pro Examples',
          href: '/examples',
        },
      },
    ],
  },

  oss: {
    order: 1,
    id: 'oss',
    label: 'OSS',
    description: 'React Flow Pro for non-commercial Open Source Projects',
    color: 'orange',
    borderColor: 'orange',
    linkColor: 'orange',
    features: [
      {
        label: (
          <>
            Access to <NextLink href="/pro-examples">Pro Examples</NextLink> for your non-commercial open source project
          </>
        ),
        description:
          'You can access the source code and guides of all Pro examples for usage in your non-commercial open source project.',
        button: {
          label: 'Pro Examples',
          href: '/examples',
        },
      },
    ],
  },
};

export default plans;
