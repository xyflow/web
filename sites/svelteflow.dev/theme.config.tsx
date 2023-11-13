import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';
import { Footer, Button, LogoLabel } from '@xyflow/xy-ui';
import { Search } from 'xy-shared';

import { InternalRoute } from '@/utils';

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
  banner: {
    text: (
      <a
        className="flex justify-center items-center max-w-xs mx-auto hover:underline"
        href="https://www.xyflow.com/blog/svelte-flow-launch"
      >
        <Image
          alt=""
          width={15}
          height={25}
          src="/img/svelte-logo.svg"
          className="mr-2"
        />
        <span>Svelte Flow just launched and is still alpha!</span>
      </a>
    ),
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
            ] satisfies { title: string; route: InternalRoute }[],
          }}
          legal={[
            {
              title: 'MIT License',
              route: 'https://github.com/xyflow/xyflow/blob/main/LICENSE',
            },
            {
              title: 'Code of Conduct',
              route:
                'https://github.com/xyflow/xyflow/blob/main/CODE_OF_CONDUCT.md',
            },
          ]}
          // imageSrc={isHomePage ? undefined : aboutImage}
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
  toc: {
    extraContent: () => (
      <Link
        href="/whats-new"
        className="nx-text-xs nx-font-medium nx-text-gray-500 hover:nx-text-gray-900 dark:nx-text-gray-400 dark:hover:nx-text-gray-100 contrast-more:nx-text-gray-800 contrast-more:dark:nx-text-gray-50"
      >
        What's new here?
      </Link>
    ),
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
            url: `${baseUrl}/img/og/svelte-flow-og.jpg`,
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
