import DashboardHeader from '@/components/DashboardHeader';
import NotSubscribedNotification from '@/components/Notification/not-subscribed';
import ExampleTeaser from '@/components/ExampleTeaser';
import { getExamples, type Framework } from '@/utils/server/examples';

const examples = getExamples({ includeFiles: false });

export default async function ProExamplesOverview({ params }: { params: { framework: Framework } }) {
  return (
    <div className="max-w-6xl mx-auto mb-20">
      <DashboardHeader
        title={
          <>
            <span className="capitalize">{params.framework} </span>Pro Examples
          </>
        }
        description="Welcome to xyflow pro! With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />
      <NotSubscribedNotification />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {examples.react
          .filter((example) => !example.hidden)
          .map((example) => (
            <ExampleTeaser key={example.id} example={example} />
          ))}
      </div>
    </div>
  );
}
