import { ShowcaseLayout } from 'xy-ui';
import showcases from '../../public/data/showcases.json';

// @todo this should be moved into getStaticProps
// if we have the data, it should be filtering out the svelte showcases from the list
const visibleShowcases = showcases.slice(0, 5);

export default function Showcase() {
  return (
    <ShowcaseLayout
      title="Craft incredible experiences with Svelte Flow."
      subtitle="We've seen people create data processing tools, chatbot builders, ML pipelines, and more with React Flow. Now we're bringing the same power to Svelte. Explore some of our favourite projects below!"
      showcases={visibleShowcases}
    />
  );
}
