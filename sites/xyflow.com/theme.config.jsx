import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';
import { Footer, Button, LogoLabel } from 'xy-ui';

import aboutImage from './public/img/about.jpg';
import SidebarTitle from '@/components/sidebar-title';
import useXYSite from '@/hooks/use-xy-site';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://xyflow.com'
    : 'http://localhost:3001';

function getOGMetaTags({ isArticle, url, frontMatter }) {
  const base = {
    url,
    type: isArticle ? 'article' : 'website',
    images: [
      {
        url: `${baseUrl}/img/og/xyflow.jpg`,
        width: 800,
        height: 600,
        alt: 'xyflow teaser',
      },
    ],
  };

  if (!isArticle) {
    return base;
  }

  return {
    ...base,
    article: {
      publishedTime: frontMatter.publishedAt,
      authors: frontMatter.authors,
      tags: frontMatter.tags,
    },
  };
}

export default {
  logo: () => <LogoLabel label="xyflow" />,
  logoLink: false,
  docsRepositoryBase: 'https://github.com/xyflow/web/tree/main/sites/docs',
  // this is necessary to hide the github icon
  project: {},
  darkMode: false,
  nextThemes: {
    forcedTheme: 'light',
    defaultTheme: 'light',
  },
  navbar: {
    // component: Navbar,
    extraContent: () => <Button>Contact Us</Button>,
  },
  sidebar: {
    titleComponent: SidebarTitle,
  },
  footer: {
    component: () => {
      const router = useRouter();
      const imageSrc = !['/', '/about'].includes(router.pathname)
        ? aboutImage
        : undefined;

      return <Footer imageSrc={imageSrc} />;
    },
  },
  search: {
    component: () => null,
  },
  feedback: {
    useLink: () => '/contact',
  },
  useNextSeoProps() {
    const router = useRouter();
    const { lib, site } = useXYSite();
    const { frontMatter } = useConfig();
    const appendix = lib ? lib : 'xyflow';
    const url = `${baseUrl}/${router.asPath}`;
    const isArticle = router.pathname.includes('/blog/');

    return {
      defaultTitle:
        'xyflow - Libraries for React and Svelte for rendering workflows, diagrams and node-based UIs.',
      titleTemplate: `%s – ${appendix}`,
      title: frontMatter.title || lib,
      description:
        frontMatter.description ||
        'xyflow - Libraries for React and Svelte for rendering workflows, diagrams and node-based UIs.',

      additionalLinkTags: [
        {
          rel: 'icon',
          href: `${baseUrl}/img/favicon.ico`,
        },
      ],

      additionalMetaTags: [
        {
          name: 'docsearch:site',
          content: site,
        },
      ],

      twitter: {
        handle: '@xyflow',
        site: '@xyflow',
        cardType: 'summary_large_image',
      },

      openGraph: getOGMetaTags({ isArticle, url, frontMatter }),
    };
  },
  head: null,
};
