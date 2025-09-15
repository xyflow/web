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

      'search-bar': '',
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
      // Rest of examples are added in `(content-pages)/layout.tsx` file
    },
  },
  ui: { items: ui },
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
    display: 'hidden',
    title: 'Pricing',
    items: {
      'case-studies': {
        theme: {
          layout: 'full',
          toc: false,
          sidebar: false,
          breadcrumb: false,
        },
      },
    },
  },
  'pro-examples': { display: 'hidden', href: '/pro/examples' },
  'case-studies': { display: 'hidden', href: '/pro/case-studies' },
  'contact-us': { display: 'hidden', href: 'https://xyflow.com/contact' },

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
