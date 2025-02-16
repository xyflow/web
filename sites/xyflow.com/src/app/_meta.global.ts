const metaRecord = {
  '*': {
    type: 'page',
  },

  // 1. Default Routes
  blog: {
    theme: {
      sidebar: false,
      breadcrumb: false,
    },
    items: {
      'react-flow-components': '',
      'react-flow-12-release':
        'React Flow 12: Server Side Rendering, Computing Flows, Dark Mode',
      'react-flow-developer-survey-2023':
        'Results from the 2023 React Flow Developer Survey',
      'update-react-flow-12-svelte-flow-1':
        'Team Update – React Flow 12, Svelte Flow for Svelte 5, editable edges',
      'react-flow-pro-platform-open-source':
        'React Flow Pro Platform goes open source',
      'why-svelte-flow': 'Why Svelte Flow?',
      'svelte-flow-launch':
        'Svelte Flow – a library for rendering interactive node-based UIs',
      'svelte-flow-alpha-xyflow':
        'Team Update – Welcoming Peter, Svelte Flow alpha and v11.9.0',
      'spring-update-2023':
        'Team update – v11.6.0, Hayleigh is here, and talking about money',
      'asking-for-money-for-open-source':
        'Dear Open Source: let’s do a better job of asking for money',
      'react-flow-v-11-5': 'v11.5.0 Release',
      'react-flow-winter-2022':
        'v11.4.0, design-tool components, an awesome list, and new examples',
      'reactflow-npm-package-name':
        'How we lost our slick new npm package name (and then got it back)',
      'react-flow-fall-2022': 'What’s new at React Flow - Fall 2022 🍂',
      'react-flow-v11': 'React Flow 11 Release',
      'react-flow-v10': 'Releasing React Flow 10 and React Flow Pro',
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
