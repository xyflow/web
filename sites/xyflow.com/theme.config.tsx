import Link from 'next/link';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';
import { Footer, Button, Logo, Text } from '@xyflow/xy-ui';
import { Head } from 'xy-shared';

const defaultDescription =
  'Open source libraries for creating interactive workflows, dynamic diagrams and custom node-based UIs.';

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
  color: {
    hue: 333,
    saturation: 100,
  },
  toc: {
    backToTop: null,
  },
  sidebar: {
    toggleButton: false,
  },
  banner: {
    // key: 'react-flow12',
    // text: (
    //   <Link
    //     className="flex justify-center items-center max-w-xs mx-auto hover:underline"
    //     href="https://reactflow.dev/learn/troubleshooting/migrate-to-v12"
    //   >
    //     🔥 React Flow 12 is here! SSR, dark mode, computing flows, and more
    //   </Link>
    // ),
  },
  head() {
    const router = useRouter();
    const { frontMatter } = useConfig();

    const title = frontMatter.title
      ? `${frontMatter.title} - xyflow`
      : 'xyflow';

    const hasImage =
      frontMatter.image && frontMatter.imageWidth && frontMatter.imageHeight;

    return (
      <Head
        title={title}
        description={frontMatter.description ?? defaultDescription}
        pageUrl={`${baseUrl}${router.asPath}`}
        faviconUrl={`${baseUrl}/img/favicon.ico`}
        ogImage={{
          url: `${baseUrl}${hasImage || '/img/og/xyflow.jpg'}`,
          width: frontMatter.imageWidth,
          height: frontMatter.imageHeight,
        }}
      />
    );
  },
};
