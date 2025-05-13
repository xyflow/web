<script>
  import { SvelteFlow, Background, Controls, MiniMap } from '@xyflow/svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw([
    {
      id: '1',
      type: 'input',
      position: { x: 0, y: 0 },
      data: { label: 'Hello' },
    },
    {
      id: '2',
      type: 'output',
      position: { x: 100, y: 100 },
      data: { label: 'World' },
    },
  ]);

  let edges = $state.raw([
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', label: 'to the' },
  ]);

  const smallDevice = new MediaQuery('max-width: 600px');
  const largeDevice = new MediaQuery('min-width: 800px');

  let minimapSize = $derived(smallDevice.current ? 100 : largeDevice.current ? 180 : 150);
</script>

<SvelteFlow bind:nodes bind:edges fitView>
  <Background />
  <Controls />
  <MiniMap width={minimapSize} height={minimapSize * 0.8} />
</SvelteFlow>
