import { FC, ReactNode } from 'react';
import { getPageMap, mergeMetaWithPageMap } from 'nextra/page-map';
import { NextraLayout } from '@/components/nextra-layout';
import { Button, defaultFooterCategories } from '@xyflow/xy-ui';
import Link from 'next/link';

const Layout: FC<{ children: ReactNode }> = async ({ children }) => {
  const { Projects: _, ...remainingCategories } = defaultFooterCategories;
  const pageMap = await getPageMap();

  const proPageMap = mergeMetaWithPageMap(pageMap, {
    learn: { display: 'hidden' },
    'api-reference': { display: 'hidden' },
    examples: { display: 'hidden' },
    components: { display: 'hidden' },
    showcase: { display: 'hidden' },
    more: { display: 'hidden' },
    pro: { display: 'normal' },
    'pro-examples': { display: 'normal' },
    'case-studies': { display: 'normal' },
    'contact-us': { display: 'normal' },
  });
  return (
    <NextraLayout
      pageMap={proPageMap}
      footerCategories={{
        'React Flow Pro': [
          { title: 'Pricing', route: '/pro/pricing' },
          { title: 'Pro Examples', route: '/pro/examples' },
          { title: 'Case Studies', route: '/pro/case-studies' },
          { title: 'Request a Quote', route: '/pro/quote-request' },
          {
            title: 'Sign Up',
            route: `${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`,
          },
          {
            title: 'Sign In',
            route: `${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/login`,
          },
        ],
        ...remainingCategories,
      }}
      navbar={
        <Button asChild className="ml-auto">
          <Link
            className="shrink-0"
            href={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}
          >
            Sign Up
          </Link>
        </Button>
      }
    >
      {children}
    </NextraLayout>
  );
};

export default Layout;
