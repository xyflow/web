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
import { getPageMap as getExamplesPageMap } from '@/app/(content-pages)/examples/[...slug]/utils';
import { getPageMap as getProExamplesPageMap } from '@/app/pro/(auth)/examples/utils';
import { meta as proExamplesMeta } from '@/app/pro/(auth)/examples/config';
import { SubscriptionProvider } from 'xy-shared/components/pro/Providers';
import { SiteNavbarContent } from 'xy-shared/components/pro/Navigation/SiteNavbar';
import type { Folder } from 'nextra';
import './global.css';

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
  const normalizePageMap = createNormalizePageMap(getExamplesPageMap);
  const [pageMap, proExamplesFolder, lastChangelog] = await Promise.all([
    normalizePageMap().catch((e) => {
      console.error('error in normalizePageMap', e);
      return [{ data: {} }];
    }),
    getProExamplesPageMap().catch(() => null),
    getLastChangelog(),
  ]);

  // Inject pro examples as children of the pro.examples sidebar entry
  const finalPageMap = [...pageMap];
  const proFolderIndex = finalPageMap.findIndex(
    (item): item is Folder => 'children' in item && (item as Folder).name === 'pro',
  );
  if (proFolderIndex !== -1 && proExamplesFolder) {
    const proFolder = finalPageMap[proFolderIndex] as Folder;
    const [proMeta, ...rawProCategories] = proExamplesFolder.children;

    // Filter each category's children to only the items listed in config.ts
    const proCategories = rawProCategories
      .filter((cat): cat is Folder => 'children' in cat && cat.name in proExamplesMeta)
      .map((cat) => {
        const catMeta = proExamplesMeta[cat.name];
        const allowedItems =
          catMeta && typeof catMeta === 'object' && 'items' in catMeta && catMeta.items
            ? (catMeta.items as Record<string, unknown>)
            : null;
        if (!allowedItems) return cat;
        return {
          ...cat,
          children: cat.children.filter(
            (child) => !('name' in child) || child.name in allowedItems,
          ),
        } as Folder;
      });

    const updatedChildren = [...proFolder.children];
    const examplesIdx = updatedChildren.findIndex(
      (item) => 'route' in item && item.route === '/pro/examples',
    );
    if (examplesIdx !== -1) {
      updatedChildren[examplesIdx] = {
        ...updatedChildren[examplesIdx],
        children: [proMeta, ...proCategories],
      } as Folder;
      finalPageMap[proFolderIndex] = { ...proFolder, children: updatedChildren };
    }
  }

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
              <SiteNavbarContent siteName="React Flow" />
            </NextraNavbar>
          }
          pageMap={finalPageMap}
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
      </body>
    </Html>
  );
}
