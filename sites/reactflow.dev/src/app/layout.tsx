/* eslint react/jsx-sort-props: 'error' */
import type { FC, ReactNode } from 'react';
import type { Metadata } from 'next';
import NextLink from 'next/link';
import { Folder, MdxFile } from 'nextra';
import { getPageMap, mergeMetaWithPageMap } from 'nextra/page-map';
import { Head, Anchor } from 'nextra/components';
import { Navbar, Layout } from 'nextra-theme-docs';
import { SparklesIcon } from '@heroicons/react/24/outline';
import reactFlowPackageJson from '@xyflow/react/package.json';
import { Button, LogoLabel } from '@xyflow/xy-ui';
import { SidebarTitle, Search } from 'xy-shared';
import { ntDapperFont } from 'xy-shared/fonts';
import { getLastChangelog } from '@/utils';
import { Footer } from '@/components/footer';
import { ClientNavbar } from '@/components/navbar.client';
import './global.css';

const APP_NAME = 'React Flow';

export const metadata: Metadata = {
  description: `${APP_NAME} - Customizable library for rendering workflows, diagrams and node-based UIs.`,
  metadataBase: new URL(reactFlowPackageJson.homepage),
  keywords: reactFlowPackageJson.keywords,
  generator: 'Next.js',
  applicationName: APP_NAME,
  appleWebApp: {
    title: APP_NAME,
  },
  title: {
    default: 'Node-Based UIs in React',
    template: `%s - ${APP_NAME}`,
  },
  openGraph: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    url: './',
    siteName: APP_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    site: 'https://x.com/xyflowdev',
    card: 'summary_large_image',
    creator: '@xyflowdev',
  },
  alternates: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    canonical: './',
  },
  other: {
    robots: 'index,follow',
    'docsearch:site': 'react',
  },
};

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  const pageMap = await getPageMap();
  const apiReference = pageMap.find(
    (item): item is Folder =>
      'children' in item && item.name === 'api-reference',
  );
  const examples = pageMap.find(
    (item): item is Folder => 'children' in item && item.name === 'examples',
  );
  const folders = [...apiReference.children, ...examples.children].filter(
    (item): item is Folder<MdxFile> => 'children' in item,
  );
  const proPageMap = mergeMetaWithPageMap(pageMap, {
    learn: { display: 'hidden' },
    'api-reference': { display: 'hidden' },
    examples: { display: 'hidden' },
    components: { display: 'hidden' },
    showcase: { display: 'hidden' },
    more: { display: 'hidden' },
    pricing: { display: 'normal' },
    'pro-examples': { display: 'normal' },
    'case-studies': { display: 'normal' },
    'contact-us': { display: 'normal' },
  })
  console.log('proPageMap',proPageMap)
  for (const folder of folders) {
    folder.children = folder.children.map(
      (item: MdxFile & { title: string }) => ({
        ...item,
        title:
          // On dev somehow we can duplicate banners without this check
          typeof item.title === 'string' ? (
            <SidebarTitle frontMatter={item.frontMatter} title={item.title} />
          ) : (
            item.title
          ),
      }),
    );
  }
  return (
    <html
      className={ntDapperFont.className}
      dir="ltr"
      lang="en"
      suppressHydrationWarning
    >
      <Head color={{ hue: 333, saturation: 80 }} />
      <body>
        <Layout
          darkMode={false}
          docsRepositoryBase="https://github.com/xyflow/web/tree/main/sites/reactflow.dev"
          editLink="Edit this page on GitHub"
          feedback={{ content: null }}
          footer={<Footer />}
          navbar={navbar}
          nextThemes={{ forcedTheme: 'light', defaultTheme: 'light' }}
          pageMap={proPageMap}
          // Set to null to avoid rendering search in mobile nav, since we added search in navbar already
          search={null}
          sidebar={{ toggleButton: false, defaultMenuCollapseLevel: 1 }}
          toc={{ backToTop: null, extraContent: <Toc /> }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
};

const classes = {
  link:
    'x:focus-visible:nextra-focus x:transition x:text-gray-600 x:dark:text-gray-400 x:hover:text-gray-800 x:dark:hover:text-gray-200 x:contrast-more:text-gray-700 x:contrast-more:dark:text-gray-100',
};
const navbar = (
  <Navbar
    align="left"
    logo={
      <LogoLabel label="React Flow" labelClassName="mr-5 md:max-lg:hidden" />
    }
    logoLink={false}
  >
    <ClientNavbar>
      {/* Put as children so it will be server component */}
      <Search />
      <NextLink
        className={classes.link}
        href="https://github.com/xyflow/xyflow"
      >
        <svg
          className="nav-github-logo"
          fill="currentColor"
          viewBox="3 3 18 18"
          width="20"
        >
          <title>GitHub</title>
          <path d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z" />
        </svg>
      </NextLink>
      <NextLink className={classes.link} href="https://discord.gg/RVmnytFmGW">
        <svg
          className="nav-github-logo"
          fill="currentColor"
          viewBox="0 0 130 90"
          width="23"
        >
          <title>Discord</title>
          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
        </svg>
      </NextLink>
      <Button asChild className="px-4 flex gap-1">
        <NextLink href="/pro">
          <SparklesIcon height="16" />
          <span className="max-[1100px]:hidden">React Flow</span>
          Pro
        </NextLink>
      </Button>
    </ClientNavbar>
  </Navbar>
);
const Toc: FC = async () => {
  const changelog = await getLastChangelog();
  return (
    <div className="grid gap-2 x:text-xs x:font-medium">
      <Anchor className={classes.link} href="https://xyflow.com/contact">
        Question? Give us feedback
      </Anchor>
      <p className="font-bold mt-4">What&apos;s new?</p>
      {[...changelog, { route: '/whats-new', title: '...and more!' }]
        .slice(0, 3)
        .map(({ route, title }) => (
          <NextLink className={classes.link} href={route} key={route}>
            {title}
          </NextLink>
        ))}
    </div>
  );
};

export default RootLayout;
