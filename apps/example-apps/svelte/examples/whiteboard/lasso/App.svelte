<script lang="ts">
  import { SvelteFlow, Background, Controls, MiniMap, Panel } from '@xyflow/svelte';
  import Lasso from './Lasso.svelte';

  import '@xyflow/svelte/dist/style.css';
  import type { Edge } from '@xyflow/svelte';

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

  const initialEdges: Edge[] = [];

  let nodes = $state.raw(initialNodes);
  let edges = $state.raw(initialEdges);
  let partial = $state(false);
</script>

<SvelteFlow bind:nodes bind:edges minZoom={0} fitView>
  <Background />
  <MiniMap />
  <Controls />
  <Lasso {partial} />
  <Panel position="top-right">
    <button onclick={() => (partial = !partial)}>
      Use {partial ? 'Full' : 'Partial'} Selection
    </button>
  </Panel>
</SvelteFlow>
