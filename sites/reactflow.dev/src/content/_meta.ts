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
  components: {
    title: 'Components',
    display: 'visible',
  },
  showcase: {
    title: 'Showcase',
    theme: {
      layout: 'raw',
    },
  },
  community: {
    title: 'More',
    // display: 'hidden',
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
  // showcase: {
  //   title: 'Showcase',
  //   display: 'hidden',
  //   theme: {
  //     layout: 'raw',
  //   },
  // },
  pro: {
    title: 'Pro',
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
  'developer-survey-2023': {
    display: 'hidden',
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
