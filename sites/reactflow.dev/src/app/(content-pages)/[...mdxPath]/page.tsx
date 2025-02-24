import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { BaseBlogPostLayout, CaseStudyLayoutWrapper } from 'xy-shared';
import { useMDXComponents as getMdxComponents } from '@/mdx-components';
import { normalizePages } from 'nextra/normalize-pages';
import { getPageMap } from 'nextra/page-map';

type PageProps = Readonly<{
  params: Promise<{
    mdxPath: string[];
  }>;
}>;

const { wrapper: Wrapper, h1: H1 } = getMdxComponents();

export default async function Page(props: PageProps) {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, toc, metadata } = result;
  const mdx = <MDXContent {...props} params={params} />;

  return (
    <Wrapper toc={toc} metadata={metadata}>
      {(async function (slug: string[]) {
        const isExamples = slug[0] === 'examples';
        if (isExamples) {
          return (
            <>
              {/* @ts-expect-error -- false positive */}
              <H1>{metadata.title}</H1>
              {mdx}
            </>
          );
        }

        const isTutorials = slug[0] === 'learn' && slug[1] === 'tutorials';
        if (isTutorials) {
          return (
            <BaseBlogPostLayout frontMatter={metadata}>
              {mdx}
            </BaseBlogPostLayout>
          );
        }

        const isCaseStudies = slug[0] === 'pro' && slug[1] === 'case-studies';
        if (isCaseStudies) {
          const pageMap = await getPageMap('/pro/case-studies');
          const { activeIndex, flatDocsDirectories } = normalizePages({
            list: pageMap.filter(
              (item) => 'name' in item && item.name !== 'index',
            ),
            route: ['', ...slug].join('/'),
          });
          return (
            <CaseStudyLayoutWrapper
              frontMatter={metadata}
              prev={flatDocsDirectories[activeIndex - 1]}
              next={flatDocsDirectories[activeIndex + 1]}
            >
              {mdx}
            </CaseStudyLayoutWrapper>
          );
        }

        return mdx;
      })(params.mdxPath)}
    </Wrapper>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

export const generateStaticParams = generateStaticParamsFor('mdxPath');
