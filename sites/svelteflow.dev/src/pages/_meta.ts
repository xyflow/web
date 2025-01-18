export default {
  '*': {
    type: 'page',
    theme: {
      layout: 'default',
    },
  },
  learn: 'Learn',
  'api-reference': 'Reference',
  examples: 'Examples',
  showcase: {
    title: 'Showcase',
    theme: {
      layout: 'raw',
    },
  },
  more: {
    title: 'More',
    type: 'menu',
    items: {
      changelog: {
        title: 'Changelog',
        href: '/whats-new',
      },
      blog: {
        title: 'Blog',
        href: 'https://xyflow.com/blog',
      },
      contact: {
        title: 'Contact Us',
        href: 'https://xyflow.com/contact',
      },
    },
  },

  index: {
    title: 'Home',
    display: 'hidden',
    theme: {
      layout: 'raw',
    },
  },
  'support-us': {
    title: 'Support Us',
    display: 'hidden',
    theme: {
      layout: 'raw',
    },
  },
  'whats-new': {
    title: "What's new?",
    display: 'hidden',
    theme: {
      layout: 'full',
    },
  },
  '404': {
    title: '404',
    theme: {
      layout: 'raw',
    },
  },
  'developer-survey-2024': {
    display: 'hidden',
    theme: {
      layout: 'full',
    },
  },
};
