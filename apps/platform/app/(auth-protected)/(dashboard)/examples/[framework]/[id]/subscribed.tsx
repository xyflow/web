import { serialize } from 'next-mdx-remote/serialize';
import ProCodeViewer from 'components/ProExampleViewer';
import { getExampleFiles, getReadme, Framework } from 'utils/server/examples';

type ProExampleFrontmatter = {
  title?: string;
  description?: string;
};

export default async function ({ exampleId, frameworkId }: { exampleId: string; frameworkId: Framework }) {
  const files = getExampleFiles(frameworkId, exampleId);
  const readme = getReadme(frameworkId, exampleId);
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
