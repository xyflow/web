import { serialize } from 'next-mdx-remote/serialize';
import ProCodeViewer from 'components/pro-example-viewer';
import { getExampleFiles } from './utils';

export default async function ({ exampleId }: { exampleId: string }) {
  const files = getExampleFiles(exampleId);
  const readme = typeof files['README.mdx'] === 'string' ? files['README.mdx'] : '';
  const readmeSource = await serialize(readme);

  return <ProCodeViewer readme={readmeSource} files={files} />;
}
