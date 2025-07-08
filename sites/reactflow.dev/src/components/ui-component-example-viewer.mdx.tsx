import { useMDXComponents as getMDXComponents } from '@/mdx-components';
import { fetchShadcnComponent } from '@/utils';
import { MDXRemote } from 'nextra/mdx-remote';
import { FC } from 'react';

const { h2: H2, h3: H3 } = getMDXComponents();

const UiComponentExampleViewer: FC<{
  id: string;
  example: string;
  title: string;
}> = async ({ id, example, title }) => {
  const data = await fetchShadcnComponent(id);

  if (!data) {
    return null;
  }

  if (!data.demoExamples || !data.demoExamples[example]) {
    return null;
  }

  return (
    <div className="mt-5">
      <H2 id={`${example}-usage`}>Example Usage: {title}</H2>
      <H2 id={`${example}-preview`}>Preview</H2>
      <iframe
        className="w-full h-[500px] rounded-md border mt-4 border-gray-200 "
        src={`${process.env.NEXT_PUBLIC_UI_COMPONENTS_URL}/components/${data.name}/examples/${example}`}
      />
      <H2 id={`${example}-code`}>Code</H2>

      <MDXRemote compiledSource={data.demoExamples[example]} />
    </div>
  );
};

/*
 * Nextra enhance its `toc` with imported `toc`s from `.md`/`.mdx` files,
 * so we can use `.mdx` prefix on `.tsx` file and export `toc` variable from here
 */
export const toc = [
  { depth: 2, value: 'Example Preview', id: 'Preview' },
  { depth: 2, value: 'Example Usage', id: 'usage' },
];

export default UiComponentExampleViewer;
