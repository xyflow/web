import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { BaseBlogPostLayout } from 'xy-shared';
import { useMDXComponents as getMdxComponents } from '@/mdx-components';

type PageProps = Readonly<{
  params: Promise<{
    mdxPath: string[];
    lang: string;
  }>;
}>;

const { wrapper: Wrapper, h1: H1 } = getMdxComponents();

export default async function Page(props: PageProps) {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, toc, metadata } = result;
  const isExamples = params.mdxPath[0] === 'examples';
  const isTutorials =
    params.mdxPath[0] === 'learn' && params.mdxPath[1] === 'tutorials';
  const mdx = <MDXContent {...props} params={params} />;

  return (
    <Wrapper toc={toc} metadata={metadata}>
      {isExamples ? (
        <>
          <H1>{metadata.title}</H1>
          {mdx}
        </>
      ) : isTutorials ? (
        <BaseBlogPostLayout frontMatter={metadata}>{mdx}</BaseBlogPostLayout>
      ) : (
        mdx
      )}
    </Wrapper>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

export const generateStaticParams = generateStaticParamsFor('mdxPath');
