import { MetaRecord } from 'nextra';

const metaRecord = {
  '*': {
    type: 'page'
  },
  learn: {
    items: {
      index: '',
      concepts: {
        items: {
          introduction: '',
          'terms-and-definitions': '',
          'core-concepts': '',
          'the-viewport': ''
        }
      },
      'getting-started': {
        items: {
          'installation-and-requirements': '',
          'building-a-flow': ''
        }
      },
      customization: {
        title: 'Customizing React Flow',
        items: {
          'custom-nodes': '',
          'custom-node-props': {
            href: '/api-reference/types/node-props'
          },
          'custom-edges': '',
          'custom-edge-props': {
            href: '/api-reference/types/edge-props'
          }
        }
      },
      layouting: '',
      'advanced-use': {
        items: {
          accessibility: '',
          testing: '',
          typescript: '',
          'uncontrolled-flow': '',
          'state-management': '',
          'computing-flows': '',
          'ssr-ssg-configuration': ''
        }
      },
      tutorials: '',
      troubleshooting: '',
      'api-reference': {
        href: '/api-reference',
      },
    }
  },
  'api-reference': {
    title: 'Reference',
    items: {
      'index': '',
      'react-flow': '',
      'react-flow-provider': ''
    }
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
  index: {
    display: 'hidden'
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
  },
  'developer-survey-2023': {
    display: 'hidden',
  },
  'developer-survey-2024': {
    display: 'hidden',
    theme: {
      layout: 'full',
    },
  },
};

export default metaRecord;
