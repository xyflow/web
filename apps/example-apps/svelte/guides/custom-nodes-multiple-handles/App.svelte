<script>
  import { SvelteFlow, Background } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';

  import TextUpdaterNode from './TextUpdaterNode.svelte';

  const nodeTypes = {
    textUpdater: TextUpdaterNode,
  };

  let nodes = $state.raw([
    {
      id: 'node-1',
      type: 'textUpdater',
      position: { x: 0, y: 0 },
      data: { value: 123 },
    },
    {
      id: 'node-2',
      position: { x: 0, y: 200 },
      data: { label: 'node 2' },
    },
    {
      id: 'node-3',
      position: { x: 200, y: 200 },
      data: { label: 'node 3' },
    },
  ]);

  let edges = $state.raw([
    { id: 'edge-1', source: 'node-1', sourceHandle: 'source-1', target: 'node-2' },
    { id: 'edge-2', source: 'node-1', sourceHandle: 'source-2', target: 'node-3' },
  ]);
</script>

<SvelteFlow bind:nodes bind:edges {nodeTypes} fitView>
  <Background />
</SvelteFlow>
