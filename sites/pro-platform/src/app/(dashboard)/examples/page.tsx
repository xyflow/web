import Link from 'next/link';
import { getExamples } from 'utils/server/examples';
import DashboardHeader from '@/components/DashboardHeader';

const examples = getExamples();

export default async function ProExamplesOverview() {
  return (
    <div className="max-w-4xl mx-auto mb-20">
      <DashboardHeader
        title="Pro Examples"
        description="Welcome to xyflow pro! With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />
      <div>
        <div>React</div>
        <ul>
          {examples.react.map((example) => (
            <Link href={`/examples/react/${example.id}`}>
              <li key={example.id}>{example.id}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div>
        <div>Svelte</div>
        <ul>
          {examples.svelte.map((example) => (
            <li key={example.id}>{example.id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
