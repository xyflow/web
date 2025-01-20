import { ShowcaseLayout } from 'xy-shared';
import { useData } from 'nextra/hooks';

export default function Showcase() {
  const { showcases } = useData();

  return (
    <ShowcaseLayout
      title="See what you can build with Svelte Flow"
      subtitle="We've seen people create data processing tools, chatbot builders, ML pipelines, and more with React Flow. Now we're bringing the same power to Svelte. In this showcase we collect our favorite projects."
      showcases={showcases}
    />
  );
}
