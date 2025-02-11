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

const metaRecord = {
  '*': {
    type: 'page',
  },
  index: {
    display: 'hidden',
  },
  'developer-survey-2023': {
    display: 'hidden',
  },
  'developer-survey-2024': {
    display: 'hidden'
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
      troubleshooting: '',
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
  examples: 'Examples',
  components: {
    title: 'Components',
  },
  showcase: {
    title: 'Showcase',
  },
  community: {
    title: 'More',
    type: 'menu',
    items: {
      'whats-new': {
        title: 'Changelog',
        href: '/whats-new',
      },
      blog: {
        title: 'Blog',
        href: 'https://xyflow.com/blog',
      },
      // discord: {
      //   title: 'Discord',
      //   href: 'https://discord.gg/RVmnytFmGW',
      // },
      // github: {
      //   title: 'Github',
      //   href: 'https://github.com/xyflow/xyflow',
      // },
      contact: {
        title: 'Contact Us',
        href: 'https://xyflow.com/contact',
      },
    },
  },
  pro: {
    title: 'Pro',
    display: 'hidden',
  },
  'whats-new': {
    title: "What's new?",
    display: 'hidden',
    theme: {
      layout: 'full',
    },
  }
};

export default metaRecord;
