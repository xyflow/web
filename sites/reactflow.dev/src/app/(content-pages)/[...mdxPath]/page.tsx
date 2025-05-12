import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { normalizePages } from 'nextra/normalize-pages';
import { getPageMap } from 'nextra/page-map';
import { BaseBlogPostLayout, CaseStudyLayoutWrapper } from 'xy-shared';

import { useMDXComponents as getMdxComponents } from '@/mdx-components';
import { getWhatsNew } from '@/utils';

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
      {(async function (slug: string[]) {
        const isTutorials = slug[0] === 'learn' && slug[1] === 'tutorials';
        if (isTutorials) {
          return (
            // @ts-expect-error -- fixme
            <BaseBlogPostLayout frontMatter={metadata}>{mdx}</BaseBlogPostLayout>
          );
        }

        const isCaseStudies = slug[0] === 'pro' && slug[1] === 'case-studies';
        if (isCaseStudies) {
          const pageMap = await getPageMap('/pro/case-studies');
          const { activeIndex, flatDocsDirectories } = normalizePages({
            list: pageMap.filter((item) => 'name' in item && item.name !== 'index'),
            route: ['', ...slug].join('/'),
          });
          return (
            <CaseStudyLayoutWrapper
              // @ts-expect-error -- fixme
              frontMatter={metadata}
              prev={flatDocsDirectories[activeIndex - 1]}
              next={flatDocsDirectories[activeIndex + 1]}
            >
              {mdx}
            </CaseStudyLayoutWrapper>
          );
        }

        const isWhatsNew = slug[0] === 'whats-new';
        if (isWhatsNew) {
          const pageMap = await getWhatsNew();
          const route = ['/whats-new', ...slug.slice(1)].join('/');
          const { activeIndex, flatDocsDirectories } = normalizePages({
            list: pageMap,
            route,
          });
          return (
            <BaseBlogPostLayout
              // @ts-expect-error -- fixme
              frontMatter={metadata}
              prev={activeIndex > 0 ? flatDocsDirectories[activeIndex - 1] : undefined}
              next={
                activeIndex < flatDocsDirectories.length - 1
                  ? flatDocsDirectories[activeIndex + 1]
                  : undefined
              }
            >
              {mdx}
            </BaseBlogPostLayout>
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

export const dynamic = 'force-static';

export const dynamicParams = false;
