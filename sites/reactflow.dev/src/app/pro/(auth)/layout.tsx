import { redirect } from 'next/navigation';
import { getNhost } from '@/utils/nhost';
// don't use a local useMDXComponents file, throws on Vercel Error: File not found: /var/task/sites/reactflow.dev/tsconfig.json
import { useMDXComponents as getMdxComponents } from 'nextra-theme-docs';

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
    <Wrapper
      toc={[]}
      // @ts-expect-error -- we explicitly provide metadata as empty object
      metadata={{}}
    >
      {children}
    </Wrapper>
  );
}
