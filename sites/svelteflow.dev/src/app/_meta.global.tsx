import { FC, ReactNode, SVGProps } from 'react';
import {
  Squares2X2Icon,
  UsersIcon,
  Cog8ToothIcon,
  ChatBubbleLeftRightIcon,
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
      concepts: {
        title: 'Core Concepts',
        items: {
          'terms-and-definitions': 'Overview',
          'building-a-flow': '',
          'the-viewport': 'The Viewport',
          'built-in-components': 'Built-in Components',
        },
      },
      customization: {
        title: 'Customization',
        items: {
          'custom-nodes': 'Nodes',
          handles: '',
          'custom-edges': 'Edges',
          'edge-labels': 'Edge Labels',
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
        title: 'Overview',
        theme: {
          breadcrumb: false,
        },
      },
      overview: '',
      nodes: {
        items: {
          'add-node-on-edge-drop': '',
          'connection-limit': '',
          'custom-node': '',
          'delete-middle-node': '',
          'drag-handle': '',
          'easy-connect': '',
          intersections: '',
          'node-resizer': '',
          'proximity-connect': '',
          'node-position-animation': '',
          shapes: '',
          stress: '',
          'update-node': '',
        },
      },
      edges: {
        items: {
          'custom-connectionline': 'Custom Connection Line',
          'custom-edges': '',
          'edge-labels': '',
          'edge-markers': '',
          'edge-types': '',
          'floating-edges': '',
          'reconnect-edge': '',
        },
      },
      interaction: {
        items: {
          'computing-flows': '',
          'context-menu': '',
          'contextual-zoom': '',
          'drag-and-drop': '',
          validation: '',
          'copy-paste': '',
          'undo-redo': '',
        },
      },
      grouping: {
        title: 'Subflows & Grouping',
        items: {
          'selection-grouping': '',
          'parent-child-relation': '',
        },
      },
      layout: {
        items: {
          dagre: '',
          elkjs: '',
          'horizontal-flow': '',
          'expand-collapse': '',
          'auto-layout': '',
          'force-layout': '',
          'node-collisions': '',
          subflows: '',
        },
      },
      styling: {
        items: {
          'base-style': '',
          'dark-mode': '',
          tailwind: '',
          'turbo-flow': '',
        },
      },
      whiteboard: {
        items: {
          eraser: '',
          'lasso-selection': '',
          rectangle: '',
          'freehand-draw': '',
        },
      },
      misc: {
        items: {
          transitions: '',
          'download-image': '',
          'threlte-flow': '',
          'remove-attribution': '',
          'server-side-image-creation': '',
        },
      },
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
      examples: {
        theme: {
          layout: 'default',
          toc: false,
          pagination: false,
        },
      },
      // Auth
      dashboard: <WithIcon icon={Squares2X2Icon}>Dashboard</WithIcon>,

      team: <WithIcon icon={UsersIcon}>Team</WithIcon>,
      account: <WithIcon icon={Cog8ToothIcon}>Account</WithIcon>,
      support: <WithIcon icon={ChatBubbleLeftRightIcon}>Support</WithIcon>,
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
    },
  },
  // 3. Hidden Routes from Navigation
  index: { display: 'hidden' },
  'whats-new': { display: 'hidden' },
  'developer-survey-2024': {
    display: 'hidden',
    theme: {
      layout: 'full',
    },
  },
};

export default metaRecord;
