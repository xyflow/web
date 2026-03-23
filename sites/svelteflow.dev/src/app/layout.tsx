import { Head } from 'nextra/components';
import { Navbar as NextraNavbar } from 'nextra-theme-docs';
import { Banner } from 'nextra/components';
import svelteFlowPackageJson from '@xyflow/svelte/package.json';

import { SessionRefresher } from 'xy-shared/components/session-refresher';
import { generateRootMetadata } from 'xy-shared/server/generate-root-metadata';
import { getLastChangelog } from 'xy-shared/server/get-last-changelog';
import { TOC } from 'xy-shared/server/toc';
import { Fathom } from 'xy-shared/components/fathom';
import { Link } from 'xy-shared/components/ui/link';
import { defaultFooterCategories, Footer as XYFooter } from 'xy-shared/components/footer';
import { LogoLabel } from 'xy-shared/components/ui/logo';
import { Html } from 'xy-shared/components/html';
import { SubscriptionProvider } from 'xy-shared/components/pro/Providers';
import { createNormalizePageMap } from 'xy-shared/server/normalize-page-map';
import { SiteNavbarContent } from 'xy-shared/components/navigation/SiteNavbar';
import { getHasNhostSession } from 'xy-shared/lib/nhost';
import './global.css';

export const metadata = generateRootMetadata('Svelte Flow', {
  description:
    'Customizable library for rendering workflows, diagrams and node-based UIs.',
  metadataBase: new URL(svelteFlowPackageJson.homepage),
  keywords: svelteFlowPackageJson.keywords,
  other: {
    'docsearch:site': 'svelte',
  },
});

const fathomOptions = {
  id: 'PFWQXXRR',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { Projects: _, ...remainingCategories } = defaultFooterCategories;
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
      <Head color={{ hue: 15, saturation: 90 }} />
      <body>
        <Fathom {...fathomOptions} />

        <SubscriptionProvider
          darkMode={true}
          banner={
            <Banner storageKey="node-collisions">
              <Link
                className="hover:underline focus-visible:nextra-focus text-sm"
                href="/examples/layout/node-collisions"
              >
                🚨 New Example: Handling Node Collisions!
              </Link>
            </Banner>
          }
          copyPageButton={false}
          docsRepositoryBase="https://github.com/xyflow/web/tree/main/sites/svelteflow.dev"
          editLink="Edit this page on GitHub"
          feedback={{ content: null }}
          footer={
            <XYFooter
              baseUrl="https://svelteflow.dev"
              categories={{
                Docs: [
                  { title: 'Quickstart Guide', route: '/' },
                  { title: 'API Reference', route: '/api-reference' },
                  { title: 'Examples', route: '/examples' },
                  { title: 'Showcase', route: '/showcase' },
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
                ],
              }}
            />
          }
          navbar={
            <NextraNavbar
              align="left"
              className="site-native-navbar justify-between"
              logo={<LogoLabel label="Svelte Flow" />}
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
        </SubscriptionProvider>
        <SessionRefresher />
      </body>
    </Html>
  );
}
