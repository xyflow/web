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
  logo: () => <LogoLabel label="Svelte Flow" />,
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
        <Button className="hidden lg:block" asChild>
          <Link href="/support-us">Support Us</Link>
        </Button>
      );
    },
  },
  footer: {
    component: () => {
      const router = useRouter();
      const isHomePage = router.pathname === '/';

      return (
        <Footer
          internal={{
            title: 'Svelte Flow',
            items: [
              { title: 'Quickstart Guide', route: '/learn' },
              { title: 'API Reference', route: '/api-reference' },
              { title: 'Examples', route: '/examples' },
              { title: 'Showcase', route: '/showcase' },
              { title: 'Support Us', route: '/support-us' },
            ],
          }}
          legal={[
            {
              title: 'MIT License',
              route: 'https://github.com/wbkd/react-flow/blob/main/LICENSE',
            },
            {
              title: 'Code of Conduct',
              route:
                'https://github.com/wbkd/react-flow/blob/main/CODE_OF_CONDUCT.md',
            },
          ]}
          imageSrc={isHomePage ? undefined : aboutImage}
          baseUrl="https://svelteflow.dev"
        />
      );
    },
  },
  search: {
    component: Search,
  },
  feedback: {
    useLink: () => 'https://xyflow.com/contact',
  },
  primaryHue: 15,
  primarySaturation: 90,
  useNextSeoProps() {
    const router = useRouter();
    const { frontMatter } = useConfig();
    const url = `${baseUrl}${router.asPath}`;

    return {
      defaultTitle: 'Svelte Flow',
      titleTemplate: '%s – Svelte Flow',
      title: frontMatter.title || 'Svelte Flow',
      description:
        frontMatter.description ||
        'Svelte Flow - Customizable library for rendering workflows, diagrams and node-based UIs.',

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
            url: `${baseUrl}/img/og/svelteflow.jpg`,
            width: 1200,
            height: 640,
            alt: 'Svelte Flow Teaser',
          },
        ],
      },
    };
  },
  head: null,
};
