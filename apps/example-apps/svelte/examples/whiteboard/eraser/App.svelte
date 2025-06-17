<script>
  import { SvelteFlow, Background, Controls, MiniMap } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  const initialNodes = [
    {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Hello' },
    },
    {
      id: '2',
      position: { x: 300, y: 0 },
      data: { label: 'World' },
    },
  ];

  const initialEdges = [
    {
      id: '1->2',
      source: '1',
      target: '2',
      type: 'smoothstep',
    },
  ];

  let nodes = $state.raw(initialNodes);
  let edges = $state.raw(initialEdges);
</script>

<SvelteFlow bind:nodes bind:edges minZoom={0} fitView>
  <Background />
  <MiniMap />
  <Controls />
</SvelteFlow>
