import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { normalizePages } from 'nextra/normalize-pages';
import { LabsLayoutWrapper, BaseBlogPostLayout } from 'xy-shared';
import { getPageMap } from 'nextra/page-map';
import { getBlogs } from '@/utils';
import { useMDXComponents as getMdxComponents } from 'xy-shared/components/mdx-components';
import { MdxFile } from 'nextra';

type PageProps = Readonly<{
  params: Promise<{
    mdxPath: string[];
  }>;
}>;

const { wrapper: Wrapper } = getMdxComponents();

export default async function Page(props: PageProps) {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, toc, metadata, sourceCode } = result;
  const mdx = <MDXContent {...props} params={params} />;

  // Determine if this is a blog or labs page based on the first path segment
  const isLabsPage = params.mdxPath[0] === 'labs';
  const isBlogPage = params.mdxPath[0] === 'blog';

  let pageMap;

  if (isLabsPage) {
    pageMap = await getPageMap('/labs');
    pageMap = pageMap.filter(
      (page) => 'name' in page && page.name !== 'index',
    ) as MdxFile[];
  } else if (isBlogPage) {
    pageMap = await getBlogs();
  } else {
    // Fallback - you might want to handle other cases
    pageMap = [];
  }

  const route = `/${[...params.mdxPath].join('/')}`;
  const { activeIndex, flatDocsDirectories } = normalizePages({
    list: pageMap,
    route,
  });

  const LayoutComponent = isLabsPage ? LabsLayoutWrapper : BaseBlogPostLayout;

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <LayoutComponent
        // @ts-expect-error -- fixme
        frontMatter={metadata}
        prev={flatDocsDirectories[activeIndex - 1]}
        next={flatDocsDirectories[activeIndex + 1]}
      >
        {mdx}
      </LayoutComponent>
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
