import { FC, ReactNode, SVGProps } from 'react';
import {
  Squares2X2Icon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  Cog8ToothIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const WithIcon: FC<{ children: ReactNode; icon: FC<SVGProps<SVGElement>> }> = ({
  children,
  icon: Icon,
}) => {
  return (
    <span className="flex items-center gap-1.5">
      <Icon height="1.2em" />
      {children}
    </span>
  );
};

const metaRecord = {
  '*': {
    type: 'page',
  },
  // 1. Default Routes
  learn: {
    items: {
      index: '',
      'getting-started': {
        items: {
          'key-concepts': '',
          installation: '',
          'building-a-flow': '',
          'built-in-components': 'Built-in Components',
        },
      },
      customization: {
        title: 'Customizing Svelte Flow',
        items: {
          'custom-nodes': '',
          'custom-edges': '',
          theming: '',
        },
      },
      layouting: {
        items: {
          'layouting-libraries': '',
          'sub-flows': '',
        },
      },
      advanced: {
        title: 'Advanced Use',
        items: {
          typescript: '',
          'server-side-rendering': '',
        },
      },
      'api-reference': { href: '/api-reference' },
    },
  },
  'api-reference': {
    title: 'Reference',
    items: {
      index: '',
      'svelte-flow': '',
      'svelte-flow-provider': '',
      components: '',
      hooks: '',
      types: '',
    },
  },
  examples: {
    theme: {
      toc: false,
      layout: 'full',
    },
    items: {
      index: {
        theme: {
          breadcrumb: false,
        },
      },
      overview: '',
      // Rest of examples are added in `(content-pages)/layout.tsx` file
    },
  },
  showcase: '',
  more: {
    type: 'menu',
    items: {
      changelog: { href: '/whats-new' },
      blog: { href: 'https://xyflow.com/blog' },
      'contact-us': { href: 'https://xyflow.com/contact' },
    },
  },
  // 2. Pro Routes
  pro: {
    items: {
      '*': {
        theme: {
          layout: 'full',
          toc: false,
          pagination: false,
        },
      },
      // Auth
      dashboard: <WithIcon icon={Squares2X2Icon}>Dashboard</WithIcon>,
      support: <WithIcon icon={ChatBubbleLeftRightIcon}>Support</WithIcon>,
      team: <WithIcon icon={UsersIcon}>Team</WithIcon>,
      account: <WithIcon icon={Cog8ToothIcon}>Account</WithIcon>,
      subscribe: {
        title: <WithIcon icon={SparklesIcon}>Subscribe</WithIcon>,
        theme: {
          collapsed: true,
        },
        items: {
          'non-commercial-edu-oss': { display: 'hidden' },
        },
      },
      // No-Auth
      'sign-in': {
        items: {
          'magic-link': {
            display: 'hidden',
          },
        },
      },
      'sign-up': '',
      'reset-password': {
        display: 'hidden',
      },
      'email-verification': {
        display: 'hidden',
      },
      // Both
      'quote-request': {
        display: 'hidden',
      },
      'case-studies': {
        display: 'hidden',
        theme: {
          layout: 'full',
          toc: false,
          sidebar: false,
          breadcrumb: false,
        },
      },
    },
  },
  // 3. Hidden Routes from Navigation
  index: { display: 'hidden' },
  'support-us': { display: 'hidden' },
  'whats-new': { display: 'hidden' },
  'developer-survey-2024': {
    display: 'hidden',
    theme: {
      layout: 'full',
    },
  },
};

export default metaRecord;
