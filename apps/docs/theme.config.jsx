import { useConfig } from 'nextra-theme-docs';

import Logo from '@/components/logo';
import Navbar, { NavBarAdditional } from '@/components/navbar';
import SidebarTitle from '@/components/sidebar-title';
import Footer from '@/components/footer';
import useXYSite from '@/hooks/useXYSite';

export default {
  logo: Logo,
  docsRepositoryBase: 'https://github.com/xyflow/xyflow',
  // this is necessary to hide the github icon
  project: {},
  navbar: {
    component: Navbar,
    extraContent: NavBarAdditional,
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
        'xyflow - Libraries for React and Svelte for rendering workflows, diagrams and node-based UIs.',
    };
  },
  head: null,
};
