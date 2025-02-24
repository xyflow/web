const metaRecord = {
  '*': {
    type: 'page',
  },

  // 1. Default Routes
  blog: {
    theme: {
      layout: 'full',
      sidebar: false,
      toc: false,
      breadcrumb: false,
      pagination: false,
    },
    items: {
      '*': {
        // Hide from mobile nav
        display: 'hidden',
      },
    },
  },
  about: '',
  'open-source': '',
  libraries: {
    type: 'menu',
    items: {
      'react-flow': { href: 'https://reactflow.dev' },
      'svelte-flow': { href: 'https://svelteflow.dev' },
    },
  },

  // 2. Hidden Routes from Navigation
  index: { display: 'hidden' },
  careers: { display: 'hidden' },
  contact: { display: 'hidden' },
  'ethical-standards': {
    display: 'hidden',
    theme: {
      toc: false,
    },
  },
  imprint: { display: 'hidden' },
  privacy: { display: 'hidden' },
  'terms-of-use': { display: 'hidden' },
};

export default metaRecord;
