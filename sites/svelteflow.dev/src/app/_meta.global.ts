export default {
  '*': {
    type: 'page',
  },
  // 1. Default Routes
  learn: {
    items: {
      index: '',
      'getting-started': {
        items: {
          'key-concepts': '',
          installation: '',
          'building-a-flow': '',
          'built-in-components': 'Built-in Components',
          'building-a-flow-old': { display: 'hidden' },
        },
      },
      customization: {
        title: 'Customizing Svelte Flow',
        items: {
          'custom-nodes': '',
          'custom-edges': '',
          theming: '',
        },
      },
      layouting: {
        items: {
          'layouting-libraries': '',
          'sub-flows': '',
        },
      },
      advanced: {
        title: 'Advanced Use',
        items: {
          typescript: '',
          'state-management': '',
          'server-side-rendering': '',
        },
      },
      guides: {
        display: 'hidden',
      },
      'api-reference': { href: '/api-reference' },
    },
  },
  'api-reference': {
    title: 'Reference',
    display: 'hidden',
    items: {
      index: '',
      'svelte-flow': '',
      'svelte-flow-provider': '',
      components: '',
      hooks: '',
      types: '',
    },
  },
  examples: {
    theme: {
      toc: false,
      layout: 'full',
    },
    items: {
      index: {
        theme: {
          breadcrumb: false,
        },
      },
      overview: '',
      nodes: {
        items: {
          'custom-node': '',
          'update-node': '',
          stress: '',
          'drag-handle': '',
          'add-node-on-edge-drop': '',
          'proximity-connect': '',
          'node-resizer': '',
          'easy-connect': '',
          'connection-limit': '',
          intersections: '',
        },
      },
      edges: '',
      layout: '',
      interaction: '',
      styling: '',
      misc: '',
    },
  },
  showcase: '',
  more: {
    type: 'menu',
    items: {
      changelog: { href: '/whats-new' },
      blog: { href: 'https://xyflow.com/blog' },
      'contact-us': { href: 'https://xyflow.com/contact' },
    },
  },
  // 2. Hidden Routes
  index: { display: 'hidden' },
  'support-us': { display: 'hidden' },
  'whats-new': {
    display: 'hidden',
    theme: {
      layout: 'full',
    },
  },
  'developer-survey-2024': {
    display: 'hidden',
    theme: {
      layout: 'full',
    },
  },
};
