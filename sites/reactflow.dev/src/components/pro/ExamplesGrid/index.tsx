import { ProExampleConfig, type Framework } from '@/types';

import ExampleTeaser from './teaser';

export default function ExampleGrid({
  framework,
  examples = [],
}: {
  framework?: Framework;
  examples: ProExampleConfig[];
}) {
  const visibleExamples = examples
    .filter((example) => {
      return (
        !example.hidden && (framework ? example.framework === framework : true)
      );
    })
    .sort((a, b) => (a.free === b.free ? 0 : a.free ? -1 : 1));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {visibleExamples.map((example) => (
        <ExampleTeaser key={example.id} example={example} />
      ))}
    </div>
  );
}
