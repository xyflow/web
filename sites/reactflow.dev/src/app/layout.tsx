import { SpeedInsights } from '@vercel/speed-insights/next';
import { Head } from 'nextra/components';
import { Navbar as NextraNavbar } from 'nextra-theme-docs';
import reactFlowPackageJson from '@xyflow/react/package.json';
import { generateRootMetadata } from 'xy-shared/server/generate-root-metadata';
import { getLastChangelog } from 'xy-shared/server/get-last-changelog';
import { TOC } from 'xy-shared/server/toc';
import { Fathom } from 'xy-shared/components/fathom';
import { defaultFooterCategories, Footer as XYFooter } from 'xy-shared/components/footer';
import { LogoLabel } from 'xy-shared/components/ui/logo';
import { Html } from 'xy-shared/components/html';
import { createNormalizePageMap } from 'xy-shared/server/normalize-page-map';

import { SubscriptionProvider } from 'xy-shared/components/pro/Providers';
import { SiteNavbarContent } from 'xy-shared/components/navigation/SiteNavbar';
import { getHasNhostSession } from 'xy-shared/lib/nhost';
import './global.css';
import { SessionRefresher } from 'xy-shared/components/session-refresher';

export const metadata = generateRootMetadata('React Flow', {
  description:
    'Customizable library for rendering workflows, diagrams and node-based UIs.',
  metadataBase: new URL(reactFlowPackageJson.homepage),
  keywords: reactFlowPackageJson.keywords,
  other: {
    'docsearch:site': 'react',
  },
});

const fathomOptions = {
  id: 'LXMRMWLB',
  domains: ['reactflow.dev'],
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { Projects, ...remainingCategories } = defaultFooterCategories;
  const normalizePageMap = createNormalizePageMap();
  const [pageMap, lastChangelog, initialHasSession] = await Promise.all([
    normalizePageMap().catch((e) => {
      console.error('error in normalizePageMap', e);
      return [{ data: {} }];
    }),
    getLastChangelog(),
    getHasNhostSession(),
  ]);

  return (
    <Html>
      <Head color={{ hue: 333, saturation: 80 }} />
      <body>
        <Fathom {...fathomOptions} />
        <SubscriptionProvider
          darkMode={true}
          copyPageButton={false}
          docsRepositoryBase="https://github.com/xyflow/web/tree/main/sites/reactflow.dev"
          editLink="Edit this page on GitHub"
          feedback={{ content: null }}
          footer={
            <XYFooter
              baseUrl="https://reactflow.dev"
              categories={{
                Docs: [
                  { title: 'Getting Started', route: '/learn' },
                  { title: 'API Reference', route: '/api-reference' },
                  { title: 'Examples', route: '/examples' },
                  { title: 'UI', route: '/ui' },
                  { title: 'Showcase', route: '/showcase' },
                  { title: 'Playground', route: 'https://play.reactflow.dev' },
                ],
                ...remainingCategories,
                Legal: [
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
                ],
              }}
            />
          }
          navbar={
            <NextraNavbar
              align="left"
              className="site-native-navbar justify-between"
              logo={
                <LogoLabel label="React Flow" labelClassName="mr-5 md:max-lg:hidden" />
              }
              logoLink={false}
            >
              <SiteNavbarContent initialHasSession={initialHasSession} />
            </NextraNavbar>
          }
          pageMap={pageMap}
          // Set to null to avoid rendering search in mobile nav, since we added search in navbar already
          search={null}
          sidebar={{ toggleButton: false }}
          toc={{
            backToTop: null,
            extraContent: <TOC pageMap={lastChangelog} />,
          }}
        >
          {children}
          <SpeedInsights />
        </SubscriptionProvider>
        <SessionRefresher />
      </body>
    </Html>
  );
}
