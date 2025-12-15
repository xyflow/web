// import { redirect } from 'next/navigation';
// import { createNhostClient } from '@/utils/nhost';
import { useMDXComponents as getMdxComponents } from '@/mdx-components';

// Use Nextra theme docs layout with the sidebar
const { wrapper: Wrapper } = getMdxComponents();

export default async function Layout({ children }: LayoutProps<'/pro'>) {
  // const nhost = await createNhostClient();
  // const isAuthenticated = !!nhost.getUserSession();

  // if (!isAuthenticated) {
  //   redirect('/pro/sign-in');
  // }

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
