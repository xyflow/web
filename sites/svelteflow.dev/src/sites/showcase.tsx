import { ShowcaseLayout } from 'xy-ui';
import showcases from '../../public/data/showcases.json';

export default function Showcase() {
  const title = `Craft incredible experiences with Svelte Flow.`;
  const subtitle = `We’ve seen people create data processing tools, chatbot
  builders, ML pipelines, and more with React Flow. Now we're bringing the same
  power to Svelte. Explore some of our favourite projects below!`;

  return (
    <ShowcaseLayout
      title={title}
      subtitle={subtitle}
      showcases={showcases.slice(0, 5)}
    />
  );
}
