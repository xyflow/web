import { serialize } from 'next-mdx-remote/serialize';
import ProCodeViewer from 'components/ProExampleViewer';
import { getExampleFiles, getReadme } from './utils';

type ProExampleFrontmatter = {
  title?: string;
  description?: string;
};

export default async function ({ exampleId }: { exampleId: string }) {
  const files = getExampleFiles(exampleId);
  const readme = getReadme(exampleId);
  const readmeSource = await serialize<Record<string, unknown>, ProExampleFrontmatter>(readme, {
    parseFrontmatter: true,
  });

  return (
    <ProCodeViewer
      title={readmeSource.frontmatter.title}
      description={readmeSource.frontmatter.description}
      exampleId={exampleId}
      readme={readmeSource}
      files={files}
    />
  );
}
