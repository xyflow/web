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
  community: {
    title: 'Community',
    type: 'menu',
    items: {
      showcase: {
        title: 'Showcase',
        href: '/showcase',
      },
      'whats-new': {
        title: "What's new?",
        href: '/whats-new',
      },
      blog: {
        title: 'Blog',
        href: 'https://xyflow.com/blog',
      },
      discord: {
        title: 'Discord',
        href: 'https://discord.gg/RVmnytFmGW',
      },
      github: {
        title: 'Github',
        href: 'https://github.com/xyflow/xyflow',
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
  showcase: {
    title: 'Showcase',
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
