import { ShowcaseLayout } from 'xy-ui';
import showcases from '../../public/data/showcases.json';

export default function Showcase() {
  return (
    <ShowcaseLayout
      title="Craft incredible experiences with Svelte Flow."
      subtitle="We've seen people create data processing tools, chatbot builders, ML pipelines, and more with React Flow. Now we're bringing the same power to Svelte. In this showcase we collect our favorite projects."
      showcases={showcases}
    />
  );
}
