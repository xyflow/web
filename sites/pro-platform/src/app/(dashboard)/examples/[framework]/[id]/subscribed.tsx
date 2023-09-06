import { serialize } from 'next-mdx-remote/serialize';
import ProCodeViewer from '@/components/ProExampleViewer';
import { Framework, getExample } from '@/utils/server/examples';

type ProExampleFrontmatter = {
  name?: string;
  description?: string;
};

export default async function ({ exampleId, frameworkId }: { exampleId: string; frameworkId: Framework }) {
  const example = getExample(frameworkId, exampleId, { includeFiles: true });
  const readme = example.files?.['README.mdx'] || '';
  const readmeSource = await serialize<Record<string, unknown>, ProExampleFrontmatter>(readme as string, {
    parseFrontmatter: true,
  });

  return <ProCodeViewer {...example} files={example.files ?? {}} exampleId={exampleId} readme={readmeSource} />;
}
