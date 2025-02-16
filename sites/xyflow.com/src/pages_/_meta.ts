export default {
  '*': {
    type: 'page',
    display: 'hidden',
  },

  blog: {
    title: 'Blog',
    display: 'normal',
  },
  about: {
    title: 'About Us',
    display: 'normal',
  },
  'open-source': {
    title: 'Open Source',
    display: 'normal',
  },
  careers: {
    title: 'Careers',
    display: 'hidden',
  },
  libraries: {
    title: 'Libraries',
    display: 'normal',
    type: 'menu',
    items: {
      'react-flow': {
        title: 'React Flow',
        href: 'https://reactflow.dev',
      },
      'svelte-flow': {
        title: 'Svelte Flow',
        href: 'https://svelteflow.dev',
      },
    },
  },
  '404': {
    title: '404',
    theme: {
      layout: 'raw',
    },
  },
  'terms-of-use': {
    title: 'Terms Of Use',
    theme: {
      layout: 'full',
    },
  },
  'ethical-standards': {
    title: 'Ethical Standards',
    theme: {
      layout: 'full',
    },
  },
  privacy: {
    title: 'Privacy',
    theme: {
      layout: 'full',
    },
  },
  imprint: {
    title: 'Imprint',
    theme: {
      layout: 'full',
    },
  },
};
