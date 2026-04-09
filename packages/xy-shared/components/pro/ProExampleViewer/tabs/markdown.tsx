import { MDXRemote } from 'nextra/mdx-remote';
import { compileMdx } from 'nextra/compile';

async function MarkdownTab({ markdown }: { markdown: string }) {
  // const compiledSource = await compileMdx(markdown);
  // return <MDXRemote compiledSource={markdown} />;

  return <div>{markdown}</div>;
}

export default MarkdownTab;
