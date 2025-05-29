import { FC, ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getNhost } from '@/utils/nhost';
import { useMDXComponents as getMdxComponents } from '@/mdx-components';

// Use Nextra theme docs layout with sidebar
const { wrapper: Wrapper } = getMdxComponents();

const DashboardLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const nhost = await getNhost();
  const session = nhost.auth.getSession();

  if (!session) {
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
