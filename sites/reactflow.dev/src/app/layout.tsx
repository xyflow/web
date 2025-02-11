import type { Metadata } from 'next';
import { Navbar, Layout } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import type { FC, ReactNode } from 'react';
import reactFlowPackageJson from '@xyflow/react/package.json';
import { Search } from './search';
import { Footer } from './footer';
import { ntDapperFont, fontClassNames } from 'xy-shared/fonts';
import { LogoLabel } from '@xyflow/xy-ui';
import { Folder, MdxFile } from 'nextra';
import { SidebarTitle } from 'xy-shared';
import './global.css';

const TITLE = 'React Flow';

export const metadata: Metadata = {
  description: `${TITLE} - Customizable library for rendering workflows, diagrams and node-based UIs.`,
  // metadataBase: new URL('https://nextra.site'),
  keywords: reactFlowPackageJson.keywords,
  generator: 'Next.js',
  applicationName: TITLE,
  appleWebApp: {
    title: TITLE,
  },
  title: {
    default: 'Node-Based UIs in React',
    template: `%s - ${TITLE}`,
  },
  openGraph: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    url: './',
    siteName: TITLE,
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
};

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  const pageMap = await getPageMap();
  const apiReference = pageMap.find(
    (item): item is Folder =>
      'children' in item && item.name === 'api-reference',
  );
  const folders = apiReference.children.filter(
    (item): item is Folder<MdxFile> => 'children' in item,
  );
  for (const folder of folders) {
    folder.children = folder.children.map((item) => ({
      ...item,
      // @ts-expect-error -- fix types in Nextra, title exist
      title: <SidebarTitle title={item.title} frontMatter={item.frontMatter} />,
    }));
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
      <body>
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
              projectLink="https://github.com/shuding/nextra"
            />
          }
          footer={<Footer />}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/xyflow/web/tree/main/sites/reactflow.dev"
          editLink="Edit this page on GitHub"
          darkMode={false}
          search={<Search />}
          nextThemes={{
            forcedTheme: 'light',
            defaultTheme: 'light',
          }}
          sidebar={{
            toggleButton: false,
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
