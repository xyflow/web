const xyNavItems = [
  {
    title: 'About',
    kind: 'MdxPage',
    name: 'xy-about',
    route: '/about',
    type: 'doc',
  },
  {
    title: 'Blog',
    kind: 'MdxPage',
    name: 'svelte-flow-guides',
    route: '/blog',
    type: 'doc',
  },
];

const reactNavItems = [
  {
    title: 'Docs',
    kind: 'MdxPage',
    name: 'react-flow-docs',
    route: '/react-flow/docs',
    type: 'doc',
  },
  {
    title: 'Guides',
    kind: 'MdxPage',
    name: 'react-flow-guides',
    route: '/react-flow/guides',
    type: 'doc',
  },
  {
    title: 'Examples',
    kind: 'MdxPage',
    name: 'react-flow-examples',
    route: '/react-flow/examples',
    type: 'doc',
  },
];

const svelteNavItems = [
  {
    title: 'Docs',
    kind: 'MdxPage',
    name: 'svelte-flow-docs',
    route: '/svelte-flow/docs',
    type: 'doc',
  },
  {
    title: 'Guides',
    kind: 'MdxPage',
    name: 'svelte-flow-guides',
    route: '/svelte-flow/guides',
    type: 'doc',
  },
  {
    title: 'Examples',
    kind: 'MdxPage',
    name: 'svelte-flow-examples',
    route: '/svelte-flow/examples',
    type: 'doc',
  },
];

export const navItems = {
  xyflow: xyNavItems,
  react: reactNavItems,
  svelte: svelteNavItems,
};
