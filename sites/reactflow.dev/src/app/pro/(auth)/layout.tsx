import { redirect } from 'next/navigation';
import { getNhost } from '@/utils/nhost';
import { useMDXComponents as getMdxComponents } from '@/mdx-components';

// Use Nextra theme docs layout with the sidebar
const { wrapper: Wrapper } = getMdxComponents();

export default async function Layout({ children }: LayoutProps<'/pro'>) {
  const nhost = await getNhost();
  const isAuthenticated = nhost.auth.isAuthenticated();
  console.log('(auth)', { isAuthenticated });
  if (!isAuthenticated) {
    redirect('/pro/sign-in');
  }
  return (
    // @ts-expect-error -- we explicitly provide metadata as empty object
    <Wrapper toc={[]} metadata={{}}>
      {children}
    </Wrapper>
  );
}
