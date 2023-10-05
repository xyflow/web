import Link from 'next/link';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';
import { Footer, Button, Text, Logo } from 'xy-ui';
import Search from '@/components/search';
import SidebarTitle from '@/components/sidebar-title';

import aboutImage from './public/img/about.jpg';

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
  logo: () => (
    <Link href="/" className="flex space-x-2 items-center">
      <Logo className="h-9 w-9" />
      <Text className="font-black text-xl">React Flow</Text>
    </Link>
  ),
  logoLink: false,
  docsRepositoryBase: 'https://github.com/xyflow/web/tree/main/sites/docs',
  // this is necessary to hide the github icon
  project: {},
  darkMode: false,
  nextThemes: {
    forcedTheme: 'light',
    defaultTheme: 'light',
  },
  sidebar: {
    titleComponent: SidebarTitle,
  },
  navbar: {
    extraContent: () => (
      <Button asChild>
        <Link href="/pro">Pro</Link>
      </Button>
    ),
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
    component: Search,
  },
  feedback: {
    useLink: () => '/contact',
  },
  primaryHue: 330,
  primarySaturation: 100,
  useNextSeoProps() {
    const router = useRouter();
    const { frontMatter } = useConfig();
    const url = `${baseUrl}/${router.asPath}`;
    const isArticle = router.pathname.includes('/blog/');

    return {
      defaultTitle:
        'xyflow - Libraries for React and Svelte for rendering workflows, diagrams and node-based UIs.',
      titleTemplate: '%s – React Flow',
      title: frontMatter.title || 'React Flow',
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
          content: 'react',
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
