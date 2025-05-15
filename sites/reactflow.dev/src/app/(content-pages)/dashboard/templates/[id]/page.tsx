import { FC } from 'react';
import { notFound } from 'next/navigation';
import ProExampleViewer from '@/components/pro/ProExampleViewer';
import { getExampleConfig } from '@/utils/pro-utils';
import { Framework } from '@/types';

type PageProps = {
  params: Promise<{ id: string }>;
};

const ProTemplatePage: FC<PageProps> = async (props) => {
  let exampleConfig = null;
  const params = await props.params;

  try {
    exampleConfig = await getExampleConfig(params);
  } catch (err) {
    console.error(err);
  }

  if (!exampleConfig) {
    notFound();
  }

  return (
    <ProExampleViewer
      config={exampleConfig}
      exampleId={params.id}
      frameworkId={Framework.REACT}
    />
  );
};

export default ProTemplatePage;

export async function generateStaticParams() {
  return [];
  // const examples = await getExampleList();
  // return examples.map((example) => ({ id: example.id, framework: example.framework }));
}

// https://github.com/leerob/on-demand-isr/blob/main/app/%5Bid%5D/page.tsx
export const dynamic = 'force-static';
export const dynamicParams = true;
