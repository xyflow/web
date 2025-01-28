import { ShowcaseLayout } from 'xy-shared';
import { useData } from 'nextra/hooks';

export default function Showcase() {
  const { showcases } = useData();

  return (
    <ShowcaseLayout
      title="Built with Svelte Flow"
      subtitle="Svelte Flow is being used in a large variety of projects. Explore some of our favorite examples from the web."
      showcases={showcases}
    />
  );
}
