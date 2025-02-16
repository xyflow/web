const metaRecord = {
  '*': {
    type: 'page',
  },

  // 1. Default Routes
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
};

export default metaRecord;
