import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';
import { Footer, Button, LogoLabel } from '@xyflow/xy-ui';
import { Head, Search } from 'xy-shared';

import { InternalRoute } from '@/utils';

const defaultDescription =
  'Svelte Flow - Customizable library for rendering workflows, diagrams and node-based UIs.';

const ogImage = {
  url: `https://svelteflow.dev/img/og/svelte-flow-og.jpg`,
};

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://svelteflow.dev'
    : 'http://localhost:3003';

export default {
  logo: () => <LogoLabel label="Svelte Flow" />,
  logoLink: false,
  docsRepositoryBase:
    'https://github.com/xyflow/web/tree/main/sites/svelteflow.dev',
  project: {
    link: 'https://github.com/xyflow/xyflow',
    icon: (
      <svg
        className="nav-github-logo"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="3 3 18 18"
      >
        <title>GitHub</title>
        <path d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"></path>
      </svg>
    ),
  },
  darkMode: false,
  nextThemes: {
    forcedTheme: 'light',
    defaultTheme: 'light',
  },
  banner: {
    key: 'whats-new',
    text: (
      <Link
        className="flex justify-center items-center max-w-xs mx-auto hover:underline"
        href="/whats-new"
      >
        <Image
          alt=""
          width={15}
          height={25}
          src="/img/svelte-logo.svg"
          className="mr-2"
        />
        <span>
          Svelte Flow is still alpha! Check out the latest changes here.
        </span>
      </Link>
    ),
  },
  sidebar: {
    toggleButton: false,
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
    backToTop: null,
    extraContent: () => (
      <Link
        href="/whats-new"
        className="_text-xs _font-medium _text-gray-500 hover:_text-gray-900 dark:_text-gray-400 dark:hover:_text-gray-100 contrast-more:_text-gray-800 contrast-more:dark:_text-gray-50"
      >
        What's new here?
      </Link>
    ),
  },
  color: {
    hue: 15,
    saturation: 90,
  },
  useNextSeoProps() {
    const router = useRouter();
    const { frontMatter } = useConfig();
    const url = `${baseUrl}${router.asPath}`;

    return {
      defaultDescription: 'Svelte Flow',
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
  head() {
    const router = useRouter();
    const { frontMatter } = useConfig();

    const title = frontMatter.title
      ? `${frontMatter.title} - Svelte Flow`
      : 'Svelte Flow';

    return (
      <Head
        title={title}
        description={frontMatter.description ?? defaultDescription}
        pageUrl={`${baseUrl}${router.asPath}`}
        faviconUrl={`${baseUrl}/img/favicon.ico`}
        ogImage={ogImage}
        framework="svelte"
      />
    );
  },
};
