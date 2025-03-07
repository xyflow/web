import DashboardHeader from '@/components/pro/DashboardHeader';
import ExamplesGrid from '@/components/pro/ExamplesGrid';
import NotSubscribedNotification from '@/components/pro/Notification/not-subscribed';
import { getExampleList } from '@/utils/pro-utils';

export default async function ProExamplesOverview() {
  const examples = (await getExampleList()).filter(
    (example) => example.type !== 'template',
  );

  return (
    <>
      <DashboardHeader
        title="Pro Examples"
        description="A continuously growing collection of advanced React Flow examples. During your subscription you can access the source code of all Pro examples."
      />
      <NotSubscribedNotification description="Please subscribe to unlock all pro examples and templates." />
      <ExamplesGrid examples={examples} />
    </>
  );
}
