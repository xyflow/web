<script>
  import { SvelteFlow } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';

  import TextUpdaterNode from './TextUpdaterNode.svelte';

  const nodeTypes = {
    textUpdater: TextUpdaterNode,
  };

  const rfStyle = {
    backgroundColor: '#B8CEFF',
  };

  let nodes = $state.raw([
    {
      id: 'node-1',
      type: 'textUpdater',
      position: { x: 100, y: 0 },
      data: { value: 123 },
    },
    {
      id: 'node-2',
      type: 'output',
      targetPosition: 'top',
      position: { x: 0, y: 200 },
      data: { label: 'node 2' },
    },
    {
      id: 'node-3',
      type: 'output',
      targetPosition: 'top',
      position: { x: 200, y: 200 },
      data: { label: 'node 3' },
    },
  ]);

  let edges = $state.raw([
    { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
    { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
  ]);
</script>

<SvelteFlow bind:nodes bind:edges {nodeTypes} fitView style={rfStyle} colorMode="system" />
