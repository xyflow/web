<script>
  import {
    SvelteFlow,
    Background,
    Controls,
    MiniMap,
    BackgroundVariant
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  const initialNodes = [
    { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
  ];
  const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

  let nodes = $state.raw(initialNodes);
  let edges = $state.raw(initialEdges);
</script>

<div style="width: 100vw; height: 100vh">
  <SvelteFlow bind:nodes bind:edges fitView colorMode="system">
    <Controls />
    <MiniMap />
    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
  </SvelteFlow>
</div>
