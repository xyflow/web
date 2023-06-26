import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';

import Logo from '@/components/logo';
import Navbar from '@/components/navbar';
import SidebarTitle from '@/components/sidebar-title';
import Footer from '@/components/footer';
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
  footer: {
    component: Footer,
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
