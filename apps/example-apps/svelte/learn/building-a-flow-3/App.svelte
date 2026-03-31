<script>
  import { SvelteFlow, Background, Controls } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw([
    {
      id: 'n1',
      position: { x: 0, y: 0 },
      data: { label: 'Node 1' },
      type: 'input',
    },
    {
      id: '2',
      position: { x: 100, y: 100 },
      data: { label: 'Node 2' },
      type: 'output',
    },
  ]);

  let edges = $state.raw([{ id: 'n1-n2', source: 'n1', target: 'n2' }]);
</script>

<div style:width="100vw" style:height="100vh">
  <SvelteFlow bind:nodes bind:edges colorMode="system" fitView>
    <Background />
    <Controls />
  </SvelteFlow>
</div>
