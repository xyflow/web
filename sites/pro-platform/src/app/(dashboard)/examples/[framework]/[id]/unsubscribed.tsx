import DashboardHeader from '@/components/DashboardHeader';
import NotSubscribedNotification from '@/components/Notification/not-subscribed';
import { getExample, type Framework } from '@/utils/server/examples';

export default function ({ exampleId, frameworkId }: { exampleId: string; frameworkId: Framework }) {
  const example = getExample(frameworkId, exampleId, { includeFiles: false });

  return (
    <div className="max-w-6xl mx-auto mb-20">
      <DashboardHeader title={example.name} description={example.description} />
      <NotSubscribedNotification description="Please subscribe to one of our plans to access the documentation and source code of this pro example." />
      <div className="mt-5 w-full h-[500px] relative">
        <iframe className="w-full h-full" src={`https://xyflow-pro-examples.vercel.app/${exampleId}`} />
      </div>
    </div>
  );
}

// return (
//   <div style={{ width: 500, height: 500 }}>
//     <iframe src={`https://xyflow-pro-examples.vercel.app/${exampleId}`} />
//   </div>
// );
