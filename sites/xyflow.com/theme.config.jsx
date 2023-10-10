import Link from 'next/link';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';
import { Footer, Button, LogoLabel, Search } from 'xy-ui';

import aboutImage from './public/img/about.jpg';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://svelteflow.dev'
    : 'http://localhost:3003';

export default {
  logo: () => <LogoLabel label="xyflow" />,
  logoLink: false,
  docsRepositoryBase:
    'https://github.com/xyflow/web/tree/main/sites/svelteflow.dev',
  // this is necessary to hide the github icon
  project: {},
  darkMode: false,
  nextThemes: {
    forcedTheme: 'light',
    defaultTheme: 'light',
  },
  navbar: {
    extraContent: () => {
      return (
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      );
    },
  },
  footer: {
    component: () => {
      return <Footer imageSrc={aboutImage} />;
    },
  },
  search: {
    component: undefined,
  },
  feedback: {
    useLink: () => 'https://xyflow.com/contact',
  },
  primaryHue: 330,
  primarySaturation: 100,
  useNextSeoProps() {
    const router = useRouter();
    const { frontMatter } = useConfig();
    const url = `${baseUrl}/${router.asPath}`;

    return {
      defaultTitle: 'xyflow',
      titleTemplate: '%s – xyflow',
      title: frontMatter.title || 'xyflow',
      description:
        frontMatter.description ||
        'xyflow - Customizable library for rendering workflows, diagrams and node-based UIs.',

      additionalLinkTags: [
        {
          rel: 'icon',
          href: `${baseUrl}/img/favicon.ico`,
        },
      ],

      additionalMetaTags: [
        {
          name: 'docsearch:site',
          content: 'svelte',
        },
      ],

      twitter: {
        handle: '@xyflow',
        site: '@xyflow',
        cardType: 'summary_large_image',
      },

      openGraph: {
        url,
        type: 'website',
        images: [
          {
            url: `${baseUrl}/img/og/xyflow.jpg`,
            width: 800,
            height: 600,
            alt: 'xyflow Teaser',
          },
        ],
      },
    };
  },
  head: null,
};
