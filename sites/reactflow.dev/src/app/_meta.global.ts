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
  'custom-edges': '',
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
const examples = {
  index: {
    theme: {
      breadcrumb: false,
    },
  },
  overview: '',
  nodes: {
    items: {
      'custom-node': '',
      'update-node': '',
      stress: '',
      hidden: '',
      'drag-handle': '',
      'easy-connect': '',
      'add-node-on-edge-drop': '',
      'proximity-connect': '',
      'node-resizer': '',
      'node-toolbar': '',
      'rotatable-node': '',
      'dynamic-grouping': '',
      intersections: '',
      shapes: '',
    },
  },
  edges: {
    items: {
      'custom-edges': '',
      'animating-edges': '',
      'edge-types': '',
      'editable-edge': '',
      'reconnect-edge': '',
      'custom-connectionline': '',
      'multi-connection-line': '',
      markers: '',
      'delete-edge-on-drop': '',
      'floating-edges': '',
      'simple-floating-edges': '',
      'edge-intersection': '',
    },
  },
  layout: {
    items: {
      'sub-flows': '',
      horizontal: '',
      dagre: '',
      'entitree-flex': '',
      elkjs: '',
      'elkjs-multiple-handles': '',
      'auto-layout': '',
      'force-layout': '',
    },
  },
  interaction: {
    items: {
      'interaction-props': '',
      'drag-and-drop': '',
      'computing-flows': '',
      validation: '',
      'connection-events': '',
      'prevent-cycles': '',
      'undo-redo': '',
      'copy-paste': '',
      'helper-lines': '',
      'touch-device': '',
      'save-and-restore': '',
      'zoom-transitions': '',
      collaborative: '',
      'contextual-zoom': '',
    },
  },
  styling: {
    items: {
      'styled-components': '',
      tailwind: '',
      'turbo-flow': '',
    },
  },
  misc: {
    items: {
      'static-server-side-generation': '',
    },
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
        title: 'Customizing React Flow',
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
    items: examples,
    theme: {
      toc: false,
      layout: 'full',
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
