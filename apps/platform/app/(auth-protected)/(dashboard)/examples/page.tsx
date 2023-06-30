import Link from 'next/link';
import { getExamples } from 'utils/server/examples';

const examples = getExamples();

export default async function ProExamplesOverview() {
  return (
    <div>
      <div>Pro Examples</div>
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
