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
  introduction: '',
  'terms-and-definitions': '',
  'core-concepts': '',
  'the-viewport': '',
};
const gettingStarted = {
  'installation-and-requirements': '',
  'building-a-flow': '',
};
const customization = {
  'custom-nodes': '',
  'handles': '',
  'custom-edges': '',
  'edge-labels': '',
  'utility-classes': '',
  theming: '',
};
const advanced = {
  accessibility: '',
  testing: '',
  typescript: '',
  'uncontrolled-flow': '',
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
  index: '',
  'remove-attribution': '',
  'migrate-to-v12': '',
  'migrate-to-v11': '',
  'migrate-to-v10': '',
};
const components = {
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
  nodes: {
    items: {
      'tooltip-node': '',
      'placeholder-node': '',
      'database-schema-node': '',
      'annotation-node': '',
      'labeled-group-node': '',
      'node-header': '',
    },
  },
  edges: {
    items: {
      'button-edge': '',
      'data-edge': '',
    },
  },
  controls: {
    items: {
      'zoom-slider': '',
    },
  },
  handles: {
    items: {
      'labeled-handle': '',
    },
  },
  misc: '',
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
      index: '',
      concepts: { items: concepts },
      'getting-started': { items: gettingStarted },
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
      pro: {
        theme: {
          breadcrumb: false,
        },
      },
      // Rest of examples are added in `app/layout.tsx` file
    },
  },
  components: { items: components },
  showcase: '',
  more: {
    type: 'menu',
    items: {
      changelog: { href: '/whats-new' },
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
