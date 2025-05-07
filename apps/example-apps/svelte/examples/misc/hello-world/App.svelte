<script lang="ts">
  import { SvelteFlow, Controls, Background, MiniMap } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw([
    {
      id: '1',
      data: { label: 'Hello' },
      position: { x: 0, y: 0 },
    },
    {
      id: '2',
      data: { label: 'World' },
      position: { x: 100, y: 100 },
    },
  ]);

  let edges = $state.raw([
    {
      id: '1-2',
      source: '1',
      target: '2',
    },
  ]);
</script>

<SvelteFlow bind:nodes bind:edges fitView>
  <Controls />
  <Background />
  <MiniMap />
</SvelteFlow>
