import { FC } from 'react';
import { notFound, redirect } from 'next/navigation';
import DashboardHeader from '@/components/pro/DashboardHeader';
import NotSubscribedNotification from '@/components/pro/Notification/not-subscribed';
import ExamplesGrid from '@/components/pro/ExamplesGrid';
import { Framework } from '@/types';
import { getExampleList } from '@/utils/pro-utils';

type PageProps = {
  params: Promise<{ framework: Framework }>;
};

const ProExamplesOverview: FC<PageProps> = async (props) => {
  const params = await props.params;
  const examples = (await getExampleList()).filter(
    (example) => example.type !== 'template',
  );

  // this is used to redirect the legacy urls (pro.reactflow.dev/examples/auto-layout) to the new url structure
  // e.g. pro.reactflow.dev/examples/react/auto-layout
  const exampleById = examples.find(
    (example) => example.id === params.framework,
  );

  if (exampleById) {
    redirect(`/examples/${exampleById.framework}/${exampleById.id}`);
  }

  if (!Object.values(Framework).includes(params.framework)) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto mb-20">
      <DashboardHeader
        title={
          <>
            <span className="capitalize">{params.framework} </span>Pro Examples
          </>
        }
        description="A continuously growing collection of advanced React Flow examples. During your subscription you can access the source code of all Pro examples."
      />
      <NotSubscribedNotification description="Please subscribe to unlock all pro examples and templates." />
      <ExamplesGrid examples={examples} />
    </div>
  );
};

export default ProExamplesOverview;

export async function generateStaticParams() {
  return [];
  // return Object.values(Framework).map((framework) => ({ framework }));
}

// https://github.com/leerob/on-demand-isr/blob/main/app/%5Bid%5D/page.tsx
export const dynamic = 'force-static';
export const dynamicParams = true;
