<script>
  import { SvelteFlow, MiniMap } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw([
    {
      id: '1',
      type: 'input',
      position: { x: 250, y: 25 },
      data: { label: 'Input' },
      style: 'background: #6ede87; color: white;',
    },
    {
      id: '2',
      position: { x: 100, y: 125 },
      data: { label: 'Default' },
      style: 'background: #ff0072; color: white;',
    },
    {
      id: '3',
      type: 'output',
      position: { x: 250, y: 250 },
      data: { label: 'Output' },
      style: 'background: #6865A5; color: white;',
    },
  ]);

  let edges = $state.raw([
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ]);
</script>

<SvelteFlow bind:nodes bind:edges fitView>
  <MiniMap
    nodeColor={(node) => {
      switch (node.type) {
        case 'input':
          return '#6ede87';
        case 'output':
          return '#6865A5';
        default:
          return '#ff0072';
      }
    }}
    zoomable
    pannable
  />
</SvelteFlow>
