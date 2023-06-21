import { getExamples } from './utils';
import ExamplesList from './examples-list';

export default async function ExamplesPage() {
  const submoduleExampleNames = await getExamples();

  return <ExamplesList />;
}
