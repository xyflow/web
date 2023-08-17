import DashboardHeader from '@/components/DashboardHeader';
import ExampleTeaser from '@/components/ExampleTeaser';

import { getExamples } from '@/utils/server/examples';

const examples = getExamples();

export default async function ProExamplesOverview() {
  return (
    <div className="max-w-6xl mx-auto mb-20">
      <DashboardHeader
        title="Pro Examples"
        description="Welcome to xyflow pro! With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.react
          .filter((example) => !example.hidden)
          .map((example) => (
            <ExampleTeaser key={example.id} example={example} />
          ))}
      </div>
    </div>
  );
}
