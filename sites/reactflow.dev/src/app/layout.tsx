import { Folder, MdxFile, MetaJsonFile } from 'nextra';
import { getPageMap, mergeMetaWithPageMap } from 'nextra/page-map';
import { Search, SidebarTitle } from 'xy-shared';
import { defaultFooterCategories, Footer as XYFooter, LogoLabel } from '@xyflow/xy-ui';
import { getPageMap as getExamplesPageMap } from './(content-pages)/examples/[...slug]/utils';
import type { FC, ReactNode } from 'react';
import { connection } from 'next/server';
import { Head } from 'nextra/components';
import reactFlowPackageJson from '@xyflow/react/package.json';
import { Html } from '@/components/html.client';
import { generateRootMetadata, getLastChangelog, TOC } from 'xy-shared/server';
import { Fathom } from 'xy-shared';
import { SubscriptionProvider } from '@/components/pro/Providers';
import { getSubscription } from '@/server-actions';
import { Layout as NextraLayout, Navbar as NextraNavbar } from 'nextra-theme-docs';
import NavMenu from '@/components/pro/Navigation/NavMenu';
import { getNhost } from '@/utils/nhost';
import { normalizeSubscription } from '@/utils/pro-utils';
import './global.css';

// mark the layouts that read cookies as dynamic so Next.js doesn't cache their HTML across users
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

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
const hidden = { display: 'hidden' };

const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  await connection();
  const { Projects: _, ...remainingCategories } = defaultFooterCategories;

  const _pageMap = [...(await getPageMap())];

  const nhost = await getNhost();
  const user = nhost.auth.getUser();

  const subscriptionContext = await getSubscription();
  const subscription = normalizeSubscription(subscriptionContext);

  const pageMap = mergeMetaWithPageMap(_pageMap, {
    pro: {
      items: user
        ? {
            'sign-in': hidden,
            'sign-up': hidden,
            ...(subscription.isSubscribed && { subscribe: hidden }),
            ...(!subscription.isAdmin && { team: hidden }),
          }
        : {
            dashboard: hidden,
            support: hidden,
            team: hidden,
            account: hidden,
            subscribe: hidden,
          },
    },
  });

  // Add badges
  const apiReference = pageMap.find(
    (item): item is Folder => 'children' in item && item.name === 'api-reference',
  );
  const examplesIndex = pageMap.findIndex(
    (item): item is Folder => 'name' in item && item.name === 'examples',
  );
  const [examplesMeta, ...examples] = (pageMap[examplesIndex] as Folder).children;
  const [catchAllExamplesMeta, ...catchAllExamples] = (await getExamplesPageMap())
    .children;
  // Merge on disk examples with examples from catch-all [...slug] route
  pageMap[examplesIndex] = {
    ...pageMap[examplesIndex],
    children: [
      {
        // Merge meta records
        data: {
          ...(examplesMeta as MetaJsonFile).data,
          ...(catchAllExamplesMeta as MetaJsonFile).data,
        },
      },
      ...examples.slice(0, -1), // Exclude /examples/pro page
      ...catchAllExamples,
      examples.at(-1)!, // Move /examples/pro to the end of sidebar
    ],
  };
  const components = pageMap.find(
    (item): item is Folder => 'children' in item && item.name === 'ui',
  );
  const folders = [
    ...apiReference!.children,
    ...components!.children,
    ...catchAllExamples,
  ].filter((item): item is Folder<MdxFile> => 'children' in item);

  for (const folder of folders) {
    // First filter out hidden items
    folder.children = folder.children
      .filter((item: MdxFile) => {
        // Skip items where frontMatter.hidden is true
        return !('frontMatter' in item && item.frontMatter?.hidden === true);
      })
      .map((item: MdxFile & { title: string }) => ({
        ...item,
        title:
          typeof item.title === 'string' ? (
            <SidebarTitle frontMatter={item.frontMatter!} title={item.title} />
          ) : (
            item.title
          ),
      }));
  }

  return (
    <Html>
      <Head color={{ hue: 333, saturation: 80 }} />
      <body>
        <Fathom {...fathomOptions} />
        <SubscriptionProvider value={subscriptionContext}>
          <NextraLayout
            darkMode={false}
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
                  // 'React Flow Pro': [
                  //   { title: 'Pricing', route: '/pro/subscribe' },
                  //   { title: 'Case Studies', route: '/pro/case-studies' },
                  //   { title: 'Request a Quote', route: '/pro/quote-request' },
                  //   { title: 'Sign Up', route: '/pro/sign-up' },
                  //   { title: 'Sign In', route: '/pro/sign-in' },
                  // ],
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
                logo={
                  <LogoLabel label="React Flow" labelClassName="mr-5 md:max-lg:hidden" />
                }
                logoLink={false}
              >
                <Search />
                <a
                  className="xy-link-gray x:focus-visible:nextra-focus"
                  href="https://github.com/xyflow/xyflow"
                  target="_blank"
                  rel="noreferrer"
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
                </a>
                <a
                  className="xy-link-gray x:focus-visible:nextra-focus"
                  href="https://discord.gg/RVmnytFmGW"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    className="nav-github-logo"
                    fill="currentColor"
                    viewBox="0 0 130 90"
                    width="23"
                  >
                    <title>Discord</title>
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                </a>
                <NavMenu user={user} />
              </NextraNavbar>
            }
            nextThemes={{ forcedTheme: 'light', defaultTheme: 'light' }}
            pageMap={pageMap}
            // Set to null to avoid rendering search in mobile nav, since we added search in navbar already
            search={null}
            sidebar={{ toggleButton: false }}
            toc={{
              backToTop: null,
              extraContent: <TOC pageMap={await getLastChangelog()} />,
            }}
          >
            {children}
          </NextraLayout>
        </SubscriptionProvider>
      </body>
    </Html>
  );
};

export default RootLayout;
