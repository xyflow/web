import DashboardHeader from '@/components/pro/DashboardHeader';
import ExamplesGrid from '@/components/pro/ExamplesGrid';
import NotSubscribedNotification from '@/components/pro/Notification/not-subscribed';
import { getExampleList } from '@/utils/pro-utils';

export default async function TemplatesOverview() {
  const examples = await getExampleList();
  const templates = examples.filter((example) => example.type === 'template');

  return (
    <>
      <DashboardHeader
        title="Pro Templates"
        description="These templates are built based on React Flow components and can be used as a starting point for building your own apps."
      />
      <NotSubscribedNotification description="Please subscribe to unlock all pro examples and templates." />
      <ExamplesGrid examples={templates} />
    </>
  );
}
