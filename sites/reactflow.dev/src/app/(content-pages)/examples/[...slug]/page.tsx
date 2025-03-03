import {
  evaluateRoute,
  getAllExamples,
  importMetadata,
  H1,
  Wrapper,
} from './utils';

type PageProps = Readonly<{
  params: Promise<{
    slug: string[];
  }>;
}>;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const route = params.slug.join('/');
  const { default: MDXContent, toc, metadata } = await evaluateRoute(route);
  return (
    <Wrapper toc={toc} metadata={metadata}>
      {/* @ts-expect-error -- false positive */}
      <H1>{metadata.title}</H1>
      <MDXContent />
    </Wrapper>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const route = params.slug.join('/');
  return importMetadata(route);
}

export async function generateStaticParams() {
  const filePaths = await getAllExamples();
  const params = filePaths.map((route) => ({ slug: route.split('/') }));
  return params;
}
