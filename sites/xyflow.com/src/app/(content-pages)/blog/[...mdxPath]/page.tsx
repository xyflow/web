import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMdxComponents } from '@/mdx-components';

type PageProps = Readonly<{
  params: Promise<{
    mdxPath: string[];
  }>;
}>;

const { wrapper: Wrapper } = getMdxComponents();

export default async function Page(props: PageProps) {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, toc, metadata } = result;
  const mdx = <MDXContent {...props} params={params} />;

  return (
    <Wrapper toc={toc} metadata={metadata}>
      {mdx}
    </Wrapper>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

export const generateStaticParams = generateStaticParamsFor('mdxPath');
