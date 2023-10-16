import Link from 'next/link';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';
import { Footer, Button, LogoLabel, Search } from 'xy-ui';

import aboutImage from './public/img/about.jpg';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://xyflow.com'
    : 'http://localhost:3001';

const noIndexNoFollow = [
  {
    name: 'robots',
    content: 'noindex, nofollow',
  },
];

export default {
  logo: () => <LogoLabel label="xyflow" />,
  logoLink: false,
  docsRepositoryBase:
    'https://github.com/xyflow/web/tree/main/sites/xyflow.com',
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
    component: () => (
      <Footer
        message={{
          title: '',
          text: `Xyflow have been building and maintaining software for node-based UIs since 2019.`,
        }}
        internal={{
          title: 'xyflow',
          items: [
            { title: 'About Us', route: '/about' },
            { title: 'Open Source', route: '/open-source' },
            { title: 'Blog', route: '/blog' },
            { title: 'Contact Us', route: '/contact' },
          ],
        }}
        legal={[
          { title: 'Terms of Use', route: 'https://xyflow.com/terms-of-use' },
          {
            title: 'Ethical Standards',
            route: 'https://xyflow.com/ethical-standards',
          },
          { title: 'Privacy Policy', route: 'https://xyflow.com/privacy' },
          { title: 'Imprint', route: 'https://xyflow.com/imprint' },
        ]}
        imageSrc={aboutImage}
        baseUrl="https://reactflow.dev"
      />
    ),
  },
  search: {
    component: undefined,
  },
  feedback: {
    useLink: () => 'https://xyflow.com/contact',
  },
  primaryHue: 333,
  primarySaturation: 100,
  useNextSeoProps() {
    const router = useRouter();
    const { frontMatter } = useConfig();
    const url = `${baseUrl}${router.asPath}`;
    const isBlog = router.pathname.includes('/blog');

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
        {
          name: 'testxy',
          content: 'xyflow',
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
            width: 1200,
            height: 640,
            alt: 'xyflow Teaser',
          },
        ],
      },

      noindex: isBlog,
      nofollow: isBlog,
    };
  },
  head: null,
};
