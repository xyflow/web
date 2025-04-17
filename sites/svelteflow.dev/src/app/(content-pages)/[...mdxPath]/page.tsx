import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMdxComponents } from '@/mdx-components';
import { getWhatsNew } from '@/utils';
import { normalizePages } from 'nextra/normalize-pages';
import { BaseBlogPostLayout } from 'xy-shared';

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
