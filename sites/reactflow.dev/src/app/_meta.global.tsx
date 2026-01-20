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

const concepts = {
  'terms-and-definitions': '',
  'building-a-flow': '',
  'adding-interactivity': '',
  'the-viewport': '',
  'built-in-components': '',
};
const customization = {
  'custom-nodes': '',
  handles: '',
  'custom-edges': '',
  'edge-labels': '',
  'utility-classes': '',
  theming: '',
};
const advanced = {
  'hooks-providers': '',
  accessibility: '',
  testing: '',
  typescript: '',
  'uncontrolled-flow': '',
  performance: '',
  'state-management': '',
  'computing-flows': '',
  'ssr-ssg-configuration': '',
};
const tutorials = {
  'slide-shows-with-react-flow': '',
  'react-flow-and-the-web-audio-api': '',
  'mind-map-app-with-react-flow': '',
};
const troubleshooting = {
  'common-errors': '',
  'remove-attribution': '',
  'migrate-to-v12': '',
  'migrate-to-v11': '',
  'migrate-to-v10': '',
};
const ui = {
  index: {
    title: 'Introduction',
    theme: {
      toc: false,
      layout: 'full',
    },
  },
  templates: {
    theme: {
      toc: false,
      layout: 'full',
    },
  },
  components: {
    items: {
      '#': {
        type: 'separator',
        title: 'Node Utilities', // Title is optional
      },
      'base-node': '',
      'node-status-indicator': 'Status Indicator',
      'node-appendix': 'Appendix',
      'node-tooltip': 'Tooltip',
      '##': {
        type: 'separator',
        title: 'Custom Nodes', // Title is optional
      },
      'database-schema-node': 'Database Schema',
      'placeholder-node': 'Placeholder',
      'labeled-group-node': 'Labeled Group',

      '###': {
        type: 'separator',
        title: 'Handles', // Title is optional
      },

      'base-handle': '',
      'labeled-handle': '',
      'button-handle': '',

      '####': {
        type: 'separator',
        title: 'Custom Edges', // Title is optional
      },

      'button-edge': '',
      'data-edge': '',
      'animated-svg-edge': '',

      '#####': {
        type: 'separator',
        title: 'Controls', // Title is optional
      },

      'node-search': '',
      'zoom-slider': '',
      'zoom-select': '',

      '######': {
        type: 'separator',
        title: 'Misc', // Title is optional
      },

      devtools: '',
    },
  },
  _: {
    type: 'separator',
  },
  'request-a-component': {
    href: 'https://github.com/xyflow/web/discussions/new?category=ui-component-requests',
  },
};
const metaRecord = {
  '*': {
    type: 'page',
  },

  // 1. Default Routes
  learn: {
    items: {
      concepts: {
        title: 'Core Concepts',
        items: concepts,
      },
      customization: {
        items: customization,
        title: 'Customization',
      },
      layouting: '',
      'advanced-use': { items: advanced },
      tutorials: {
        items: tutorials,
        theme: {
          toc: false,
        },
      },
      troubleshooting: { items: troubleshooting },
      'api-reference': { href: '/api-reference' },
    },
  },
  'api-reference': {
    title: 'Reference',
    items: {
      index: '',
      'react-flow': '',
      'react-flow-provider': '',
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
    },
  },
  ui: { items: ui },
  showcase: '',
  more: {
    type: 'menu',
    items: {
      changelog: { href: '/whats-new' },
      'case-studies': { href: '/pro/case-studies' },
      blog: { href: 'https://xyflow.com/blog' },
      'contact-us': { href: 'https://xyflow.com/contact' },
      playground: { href: 'https://play.reactflow.dev' },
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
  'developer-survey-2023': {
    display: 'hidden',
    theme: {
      footer: false,
    },
  },
  'developer-survey-2024': { display: 'hidden' },
  'whats-new': { display: 'hidden' },
};

export default metaRecord;
