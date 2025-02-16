/* eslint react/jsx-sort-props: 'error' */
import { ComponentProps, FC, ReactNode } from 'react';
// import NextLink from 'next/link';
// import { Anchor } from 'nextra/components';
import { Layout, Navbar } from 'nextra-theme-docs';
import { Button, Footer, Logo, Text } from '@xyflow/xy-ui';
import Link from 'next/link';
import { getPageMap } from 'nextra/page-map';
// import { getLastChangelog } from '@/utils';

const Toc: FC = async () => {
  // const changelog = await getLastChangelog();
  // return (
  //   <div className="grid gap-2 x:text-xs x:font-medium">
  //     <Anchor className="xy-link-gray" href="https://xyflow.com/contact">
  //       Question? Give us feedback
  //     </Anchor>
  //     <p className="font-bold mt-4">What&apos;s new?</p>
  //     {[...changelog, { route: '/whats-new', title: '...and more!' }]
  //       .slice(0, 3)
  //       .map(({ route, title }) => (
  //         <NextLink className="xy-link-gray" href={route} key={route}>
  //           {title}
  //         </NextLink>
  //       ))}
  //   </div>
  // );
};

export const NextraLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  const pageMap = await getPageMap()
  return (
    <Layout
      // darkMode={false}
      // docsRepositoryBase="https://github.com/xyflow/web/tree/main/sites/reactflow.dev"
      // editLink="Edit this page on GitHub"
      // feedback={{ content: null }}
      footer={
        <Footer
          message={{
            title: 'Hello from the xyflow team',
            text: 'xyflow is building and maintaining open source software for node-based UIs since 2019.',
          }}
          baseUrl="https://xyflow.com"
        />
      }
      navbar={
        <Navbar
          align="left"
          logo={
            <div className="flex space-x-2 items-center">
              <Link className="flex space-x-2 items-center" href="/">
                <Logo className="h-9 w-9" />
                <Text className="font-black text-xl leading-none">xyflow</Text>
              </Link>
              <Link
                className="max-md:hidden bg-primary rounded-full px-2 font-bold text-primary-foreground text-sm hover:opacity-80"
                href="/careers"
              >
                hiring
              </Link>
            </div>
          }
          logoLink={false}
        >
          <Button asChild>
            <Link href="/contact" className="shrink-0">
              Contact Us
            </Link>
          </Button>
        </Navbar>
      }
      // nextThemes={{ forcedTheme: 'light', defaultTheme: 'light' }}
      pageMap={pageMap}
      // // Set to null to avoid rendering search in mobile nav, since we added search in navbar already
      // search={null}
      // sidebar={{ toggleButton: false, defaultMenuCollapseLevel: 1 }}
      // toc={{ backToTop: null, extraContent: <Toc /> }}
    >
      {children}
    </Layout>
  );
};
