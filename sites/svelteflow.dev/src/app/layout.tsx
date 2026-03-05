import NextLink from 'next/link';
import type { ReactNode } from 'react';
import { Head } from 'nextra/components';
import { Navbar as NextraNavbar } from 'nextra-theme-docs';
import svelteFlowPackageJson from '@xyflow/svelte/package.json';
import { generateRootMetadata } from 'xy-shared/server/generate-root-metadata';
import { getLastChangelog } from 'xy-shared/server/get-last-changelog';
import { TOC } from 'xy-shared/server/toc';
import { Fathom } from 'xy-shared/components/fathom';
import { Search } from 'xy-shared/components/search';
import { Link } from 'xy-shared/components/ui/link';
import { defaultFooterCategories, Footer as XYFooter } from 'xy-shared/components/footer';
import { LogoLabel } from 'xy-shared/components/ui/logo';
import NavMenu from 'xy-shared/components/pro/Navigation/NavMenu';
import { Html } from 'xy-shared/components/html';
import { SubscriptionProvider } from 'xy-shared/components/pro/Providers';
import { createNormalizePageMap } from 'xy-shared/server/normalize-page-map';
import { getPageMap as getExamplesPageMap } from '@/app/(content-pages)/examples/[...slug]/utils';
import { getPageMap as getProExamplesPageMap } from '@/app/pro/(auth)/examples/utils';
import { meta as proExamplesMeta } from '@/app/pro/(auth)/examples/config';
import {
  NavDropdown,
  type NavDropdownItem,
} from 'xy-shared/components/pro/Navigation/NavDropdown';
import type { Folder } from 'nextra';
import { Banner } from 'nextra/components';

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

const EXAMPLES_ITEMS: NavDropdownItem[] = [
  {
    icon: 'squares-2x2',
    title: 'All Examples',
    description: 'Browse all example apps.',
    href: '/examples',
  },
  {
    icon: 'sparkles',
    title: 'Pro Examples',
    description: 'Advanced example apps to power production-grade UIs.',
    href: '/pro/examples',
  },
];

const PRO_ITEMS: NavDropdownItem[] = [
  {
    icon: 'sparkles',
    title: 'Pro Examples',
    description: 'Advanced example apps to power production-grade UIs.',
    href: '/pro/examples',
  },
  {
    icon: 'credit-card',
    title: 'Pricing',
    description: 'Subscribe to unlock Pro Examples and support our team.',
    href: '/pro',
  },
];

const MORE_ITEMS: NavDropdownItem[] = [
  {
    icon: 'megaphone',
    title: 'Changelog',
    description: "What's new in the latest releases.",
    href: '/whats-new',
  },
  {
    icon: 'chat',
    title: 'Contact Us',
    description: 'Get in touch with the team.',
    href: 'https://xyflow.com/contact',
    external: true,
  },
  {
    icon: 'newspaper',
    title: 'Blog',
    description: 'Articles, announcements and community stories.',
    href: 'https://xyflow.com/blog',
    external: true,
  },
];

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { Projects: _, ...remainingCategories } = defaultFooterCategories;
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
              <div className="ml-2 mr-auto hidden items-center gap-0.5 md:flex">
                <DesktopNavLink href="/learn">Learn</DesktopNavLink>
                <DesktopNavLink href="/api-reference">Reference</DesktopNavLink>
                <NavDropdown label="Examples" items={EXAMPLES_ITEMS} />
                <NavDropdown label="Pro" items={PRO_ITEMS} />
                <DesktopNavLink href="/showcase">Showcase</DesktopNavLink>
                <NavDropdown label="More" items={MORE_ITEMS} />
              </div>
              <Search />
              <a
                className="xy-link-gray focus-visible:nextra-focus"
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
                className="xy-link-gray focus-visible:nextra-focus"
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
              <NavMenu siteName="Svelte Flow" />
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
        </SubscriptionProvider>
      </body>
    </Html>
  );
}

function DesktopNavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <NextLink
      href={href}
      className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </NextLink>
  );
}
