import { useMDXComponents as getMdxComponents } from '@/mdx-components';

// Use Nextra theme docs layout with the sidebar
const { wrapper: Wrapper } = getMdxComponents();

export default async function Layout({ children }: LayoutProps<'/pro'>) {
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
