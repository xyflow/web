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
      'getting-started': '',
      customization: 'Customizing React Flow',
      layouting: '',
      'advanced-use': '',
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
