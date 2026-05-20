<script>
  import { SvelteFlow, Background } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

   const initialNodes = [
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 150, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 0, y: 150 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 300, y: 150 },
  },
];

 const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];


  let nodes = $state.raw(initialNodes);
  let edges = $state.raw(initialEdges);


</script>

<SvelteFlow bind:nodes bind:edges fitView colorMode="system">
  <Background />
</SvelteFlow>
