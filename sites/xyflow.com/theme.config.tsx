import Link from 'next/link';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';
import { Footer, Button, Logo, Text, cn } from '@xyflow/xy-ui';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://xyflow.com'
    : 'http://localhost:3001';

export default {
  logo: () => (
    <div className="flex space-x-2 items-center">
      <Link className="flex space-x-2 items-center" href="/">
        <Logo className="h-9 w-9" />
        <Text className="font-black text-xl leading-none">xyflow</Text>
      </Link>
      <Link
        className="bg-primary rounded-full px-2 font-bold text-primary-foreground text-sm hover:opacity-80"
        href="/careers"
      >
        hiring
      </Link>
    </div>
  ),
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
    component: () => {
      return (
        <Footer
          message={{
            title: 'Hello from the xyflow team',
            text: 'xyflow is building and maintaining open source software for node-based UIs since 2019.',
          }}
          baseUrl="https://xyflow.com"
        />
      );
    },
  },
  search: {
    component: undefined,
  },
  feedback: {
    useLink: () => 'https://xyflow.com/contact',
  },
  primaryHue: 333,
  primarySaturation: 100,
  banner: {
    key: 'react-flow12',
    text: (
      <Link
        className="flex justify-center items-center max-w-xs mx-auto hover:underline"
        href="https://reactflow.dev/learn/troubleshooting/migrate-to-v12"
      >
        🔥 React Flow 12 is here! SSR, dark mode, computing flows, and more
      </Link>
    ),
  },
  useNextSeoProps() {
    const router = useRouter();
    const { frontMatter } = useConfig();
    const url = `${baseUrl}${router.asPath}`;
    const hasImage =
      frontMatter.image && frontMatter.imageWidth && frontMatter.imageHeight;

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
            url: `${baseUrl}${hasImage || '/img/og/xyflow.jpg'}`,
            width: hasImage ? frontMatter.imageWidth : 1200,
            height: hasImage ? frontMatter.imageHeight : 640,
            alt: 'xyflow Teaser',
          },
        ],
      },
    };
  },
  head: null,
};
