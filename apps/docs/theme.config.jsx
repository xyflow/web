import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';

import Logo from './src/components/Logo';
import Navbar from './src/components/Navbar';
import SidebarTitle from './src/components/SidebarTitle';
import useXYSite from '@/hooks/useXYSite';

export default {
  logo: Logo,
  project: {
    link: 'https://github.com/xyflow/xyflow',
  },
  navbar: {
    component: Navbar,
  },
  sidebar: {
    titleComponent: SidebarTitle,
  },
  useNextSeoProps() {
    const { lib } = useXYSite();
    const { frontMatter } = useConfig();

    return {
      titleTemplate: `%s – ${lib}`,
      title: frontMatter.title || lib,
      description:
        frontMatter.description ||
        'xyflow - Libraries for React and Svelte for rendering node-based UIs.',
    };
  },
  head: null,
};
