<script lang="ts">
  import { SvelteFlow, Controls, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import TurboNode from './TurboNode.svelte';
  import TurboEdge from './TurboEdge.svelte';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes = {
    turbo: TurboNode,
  };

  const edgeTypes = {
    turbo: TurboEdge,
  };

  const defaultEdgeOptions = {
    type: 'turbo',
    markerEnd: 'edge-circle',
  };
</script>

<SvelteFlow bind:nodes {nodeTypes} bind:edges {edgeTypes} {defaultEdgeOptions} fitView>
  <Controls showLock={false} />
  <svg>
    <defs>
      <linearGradient id="edge-gradient">
        <stop offset="0%" stop-color="#ae53ba" />
        <stop offset="100%" stop-color="#2a8af6" />
      </linearGradient>
      <marker
        id="edge-circle"
        viewBox="-5 -5 10 10"
        refX="0"
        refY="0"
        markerUnits="strokeWidth"
        markerWidth="10"
        markerHeight="10"
        orient="auto"
      >
        <circle stroke="#2a8af6" stroke-opacity="0.75" r="2" cx="0" cy="0" />
      </marker>
    </defs>
  </svg>
</SvelteFlow>
