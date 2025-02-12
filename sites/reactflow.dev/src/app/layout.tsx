import type { Metadata } from 'next';
import { Navbar, Layout } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import type { FC, ReactNode } from 'react';
import reactFlowPackageJson from '@xyflow/react/package.json';
import { Search } from '@/components/search';
import { Footer } from '@/components/footer';
import { ClientNavbar } from '@/components/navbar.client';
import { ntDapperFont } from 'xy-shared/fonts';
import { Button, LogoLabel } from '@xyflow/xy-ui';
import { Folder, MdxFile } from 'nextra';
import { SidebarTitle } from 'xy-shared';
import Link from 'next/link';
import { SparklesIcon } from '@heroicons/react/24/outline';
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
  for (const folder of folders) {
    folder.children = folder.children.map(
      (item: MdxFile & { title: string }) => ({
        ...item,
        title:
          // On dev somehow we can duplicate banners without this check
          typeof item.title === 'string' ? (
            <SidebarTitle title={item.title} frontMatter={item.frontMatter} />
          ) : (
            item.title
          ),
      }),
    );
  }
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={ntDapperFont.className}
    >
      <Head
        color={{
          hue: 333,
          saturation: 80,
        }}
      />
      <body className="[&_.nextra-navbar>nav]:justify-start [&_.nextra-navbar>nav>div]:me-0">
        <Layout
          navbar={
            <Navbar
              logo={
                <LogoLabel
                  label="React Flow"
                  labelClassName="mr-5 md:max-lg:hidden"
                />
              }
              logoLink={false}
              // className="justify-start"
            >
              <Search />
              <ClientNavbar />
              <Button className="px-4 flex gap-1" asChild>
                <Link href="/pro">
                  <SparklesIcon className="w-4 h-4" />
                  <span className="max-[1100px]:hidden">React Flow</span>
                  Pro
                </Link>
              </Button>
            </Navbar>
          }
          footer={<Footer />}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/xyflow/web/tree/main/sites/reactflow.dev"
          editLink="Edit this page on GitHub"
          darkMode={false}
          // Set to null to avoid rendering search in mobile nav, since we added search in navbar already
          search={null}
          nextThemes={{
            forcedTheme: 'light',
            defaultTheme: 'light',
          }}
          sidebar={{
            toggleButton: false,
            defaultMenuCollapseLevel: 1,
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
