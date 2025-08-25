import { FC, ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getNhost } from '@/utils/nhost';
import { useMDXComponents as getMdxComponents } from '@/mdx-components';
import { unstable_noStore as noStore } from 'next/cache';

// mark the layouts that read cookies as dynamic so Next.js doesn't cache their HTML across users
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// Use Nextra theme docs layout with the sidebar
const { wrapper: Wrapper } = getMdxComponents();

const DashboardLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  noStore();
  const nhost = await getNhost();
  const isAuthenticated = nhost.auth.isAuthenticated();

  if (!isAuthenticated) {
    redirect('/pro/sign-in');
  }
  return (
    // @ts-expect-error -- we explicitly provide metadata as empty object
    <Wrapper toc={[]} metadata={{}}>
      {children}
    </Wrapper>
  );
};

export default DashboardLayout;
