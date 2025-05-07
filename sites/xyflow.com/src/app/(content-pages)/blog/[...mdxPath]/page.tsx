import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { normalizePages } from 'nextra/normalize-pages';
import { BaseBlogPostLayout } from 'xy-shared';
import { getBlogs } from '@/utils';
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

  const pageMap = await getBlogs();
  const route = ['/blog', ...params.mdxPath].join('/');
  const { activeIndex, flatDocsDirectories } = normalizePages({
    list: pageMap,
    route,
  });
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <BaseBlogPostLayout
        // @ts-expect-error -- fixme
        frontMatter={metadata}
        prev={flatDocsDirectories[activeIndex - 1]}
        next={flatDocsDirectories[activeIndex + 1]}
      >
        {mdx}
      </BaseBlogPostLayout>
    </Wrapper>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

export const generateStaticParams = generateStaticParamsFor('mdxPath');

export const dynamic = 'force-static';

export const dynamicParams = false;
