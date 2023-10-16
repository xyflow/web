import Link from 'next/link';
import { useRouter } from 'next/router';
import { useConfig, Navbar } from 'nextra-theme-docs';
import { Footer, Button, LogoLabel, Search } from 'xy-ui';

import SidebarTitle from '@/components/sidebar-title';
import aboutImage from './public/img/about.jpg';

function useIsPro() {
  const router = useRouter();
  return router.pathname.includes('/pro');
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
  navbar: {
    component: (props) => {
      const isPro = useIsPro();

      if (isPro) {
        return (
          <Navbar
            {...props}
            items={[
              {
                title: 'Pricing',
                href: '/pro/pricing',
              },
              { title: 'Pro Examples', href: '/pro/examples' },
              { title: 'Case Studies', href: '/pro/case-studies' },
              { title: 'Enterprise', href: '/pro/enterprise' },
            ]}
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
            <Link href="https://pro.xyflow.com/signup">Sign Up</Link>
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
      return <Footer imageSrc={aboutImage} baseUrl="https://reactflow.dev" />;
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
