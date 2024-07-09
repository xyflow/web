import Link from 'next/link';
import { useRouter } from 'next/router';
import { useConfig, Navbar } from 'nextra-theme-docs';
import { Footer, Button, LogoLabel, cn } from '@xyflow/xy-ui';
import { Search, SidebarTitle } from 'xy-shared';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { type Route } from '@/utils';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://reactflow.dev'
    : 'http://localhost:3002';

export default {
  logo: () => <LogoLabel label="React Flow" />,
  logoLink: false,
  docsRepositoryBase:
    'https://github.com/xyflow/web/tree/main/sites/reactflow.dev',
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
  sidebar: {
    titleComponent: SidebarTitle,
  },
  banner: {
    key: 'legacy-v11',
    text: (
      <>
        💡 This is the legacy site for v11. If you are looking for the latest
        docs, please visit{' '}
        <Link className="underline" href="https://reactflow.dev">
          React Flow
        </Link>
      </>
    ),
    dismissible: false,
  },
  navbar: {
    extraContent: () => {
      return (
        <Button className="px-4" asChild>
          <Link href="https://reactflow.dev/pro">
            <SparklesIcon className="w-4 h-4 mr-1" />
            <span>
              <span className="hidden lg:inline">React Flow </span>
              <span>Pro</span>
            </span>
          </Link>
        </Button>
      );
    },
  },
  footer: {
    component: () => {
      return (
        <Footer
          internal={{
            title: 'React Flow',
            items: [
              { title: 'Quickstart Guide', route: '/learn' },
              { title: 'API Reference', route: '/api-reference' },
              { title: 'Examples', route: '/examples' },
              { title: 'Showcase', route: 'https://reactflow.dev/showcase' },
              {
                title: 'Case Studies',
                route: 'https://reactflow.dev/pro/case-studies',
              },
              { title: 'React Flow Pro', route: 'https://reactflow.dev/pro' },
            ],
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
            { title: 'Imprint', route: 'https://xyflow.com/imprint' },
          ]}
          // imageSrc={isHomePage ? undefined : aboutImage}
          baseUrl="https://v11.reactflow.dev"
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
  primaryHue: 333,
  primarySaturation: 80,
  useNextSeoProps() {
    const router = useRouter();
    const { frontMatter } = useConfig();
    const url = `${baseUrl}${router.asPath}`;

    return {
      defaultTitle: 'React Flow',
      titleTemplate: '%s – React Flow',
      title: frontMatter.title || 'React Flow',
      description:
        frontMatter.description ||
        'React Flow - Customizable library for rendering workflows, diagrams and node-based UIs.',

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

      openGraph: {
        url,
        type: 'website',
        images: [
          {
            url: `${baseUrl}/img/og/react-flow-og.jpg`,
            width: 1200,
            height: 640,
            alt: 'React Flow Teaser',
          },
        ],
      },
      noindex: true,
      nofollow: true,
    };
  },
  head: null,
};
