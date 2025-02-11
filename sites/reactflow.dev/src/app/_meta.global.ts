import { MetaRecord } from 'nextra';

const concepts: MetaRecord = {
  introduction: '',
  'terms-and-definitions': '',
  'core-concepts': '',
  'the-viewport': '',
};
const gettingStarted: MetaRecord = {
  'installation-and-requirements': '',
  'building-a-flow': '',
};
const customization: MetaRecord = {
  'custom-nodes': '',
  'custom-node-props': { href: '/api-reference/types/node-props' },
  'custom-edges': '',
  'custom-edge-props': { href: '/api-reference/types/edge-props' },
};
const advanced: MetaRecord = {
  accessibility: '',
  testing: '',
  typescript: '',
  'uncontrolled-flow': '',
  'state-management': '',
  'computing-flows': '',
  'ssr-ssg-configuration': '',
};
const tutorials: MetaRecord = {
  'slide-shows-with-react-flow': '',
  'react-flow-and-the-web-audio-api': '',
  'mind-map-app-with-react-flow': '',
};
const troubleshooting: MetaRecord = {
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
  edges: '',
  layout: '',
  interaction: '',
  styling: '',
};
const metaRecord = {
  '*': {
    type: 'page',
  },
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
    },
  },
  components: { items: components },
  showcase: '',
  more: {
    title: 'More',
    type: 'menu',
    items: {
      changelog: { href: '/whats-new' },
      blog: { href: 'https://xyflow.com/blog' },
      'contact-us': { href: 'https://xyflow.com/contact' },
    },
  },
  index: { display: 'hidden' },
  'developer-survey-2023': { display: 'hidden' },
  'developer-survey-2024': { display: 'hidden' },
  pro: { display: 'hidden' },
  'whats-new': { display: 'hidden' },
};

export default metaRecord;
