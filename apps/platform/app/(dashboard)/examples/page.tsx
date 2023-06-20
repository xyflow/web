import examples from 'config/examples';
import { getExamples } from './utils';
import ExamplesList from './examples-list';

export default async function ExamplesPage() {
  const submoduleExampleNames = await getExamples();

  return (
    <>
      {submoduleExampleNames.map((exampleName) => (
        <div>{exampleName}</div>
      ))}
      <ExamplesList examples={examples} />
    </>
  );
}
