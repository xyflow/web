import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useConfig, Navbar } from 'nextra-theme-docs';
import { Footer, Button, LogoLabel, Search } from 'xy-ui';

import SidebarTitle from '@/components/sidebar-title';
import aboutImage from './public/img/about.jpg';
import { type Route } from '@/utils';

function useIsPro() {
  const router = useRouter();
  return router.pathname.includes('/pro');
}

function useIsProSubPage() {
  const router = useRouter();
  return router.pathname.startsWith('/pro') && router.pathname !== '/pro';
}

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://reactflow.dev'
    : 'http://localhost:3002';

export default {
  logo: () => <LogoLabel label="React Flow" />,
  logoLink: false,
  docsRepositoryBase:
    'https://github.com/xyflow/web/tree/main/sites/reactflow.dev',
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
  banner: {
    text: (
      <a
        className="flex justify-center items-center"
        href="https://svelteflow.dev"
      >
        <Image
          alt=""
          width={15}
          height={25}
          src="/img/svelte-logo.svg"
          className="mr-1"
        />
        <div>We've just launched Svelte Flow!</div>
      </a>
    ),
  },
  navbar: {
    component: (props) => {
      const isPro = useIsPro();
      const isProSubPage = useIsProSubPage();

      if (isPro) {
        return (
          <Navbar
            {...props}
            items={
              [
                // ...(isProSubPage ? [{ title: 'Home', href: '/pro/pricing' }] : []),
                { title: 'Pricing', href: '/pro/pricing' },
                { title: 'Pro Examples', href: '/pro/examples' },
                { title: 'Case Studies', href: '/pro/case-studies' },
                { title: 'Enterprise', href: '/pro/enterprise' },
              ] satisfies { title: string; href: Route }[]
            }
          />
        );
      }

      return <Navbar {...props} />;
    },
    extraContent: () => {
      const isPro = useIsPro();

      if (isPro) {
        return (
          <Button asChild>
            <Link href={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}>
              Sign Up
            </Link>
          </Button>
        );
      }

      return (
        <Button asChild>
          <Link href="/pro">Pro</Link>
        </Button>
      );
    },
  },
  footer: {
    component: () => {
      const router = useRouter();
      const isHomePage = router.pathname === '/';
      const isPro = useIsPro();

      return (
        <Footer
          internal={{
            title: isPro ? 'React Flow Pro' : 'React Flow',
            items: isPro
              ? [
                  { title: 'Pricing', route: '/pro/pricing' },
                  { title: 'Pro Examples', route: '/pro/examples' },
                  { title: 'Case Studies', route: '/pro/case-studies' },
                  { title: 'Enterprise', route: '/pro/enterprise' },
                  {
                    title: 'Sign Up',
                    route: `${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`,
                  },
                  {
                    title: 'Sign In',
                    route: `${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/login`,
                  },
                ]
              : ([
                  { title: 'Quickstart Guide', route: '/learn' },
                  { title: 'API Reference', route: '/api-reference' },
                  { title: 'Examples', route: '/examples' },
                  { title: 'Showcase', route: '/showcase' },
                  { title: 'React Flow Pro', route: '/pro' },
                ] satisfies { title: string; route: Route }[]),
          }}
          legal={
            isPro
              ? [
                  {
                    title: 'Terms of Use',
                    route: 'https://xyflow.com/terms-of-use',
                  },
                  {
                    title: 'Ethical Standards',
                    route: 'https://xyflow.com/ethical-standards',
                  },
                  {
                    title: 'Privacy Policy',
                    route: 'https://xyflow.com/privacy',
                  },
                  { title: 'Imprint', route: 'https://xyflow.com/imprint' },
                ]
              : [
                  {
                    title: 'MIT License',
                    route:
                      'https://github.com/wbkd/react-flow/blob/main/LICENSE',
                  },
                  {
                    title: 'Code of Conduct',
                    route:
                      'https://github.com/wbkd/react-flow/blob/main/CODE_OF_CONDUCT.md',
                  },
                  { title: 'Imprint', route: 'https://xyflow.com/imprint' },
                ]
          }
          // imageSrc={isHomePage ? undefined : aboutImage}
          baseUrl="https://reactflow.dev"
        />
      );
    },
  },
  search: {
    component: (props) => {
      const isPro = useIsPro();

      if (isPro) {
        return null;
      }

      return <Search {...props} />;
    },
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
            url: `${baseUrl}/img/og/reactflow.jpg`,
            width: 1200,
            height: 640,
            alt: 'React Flow Teaser',
          },
        ],
      },
    };
  },
  head: null,
};
