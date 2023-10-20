<script lang="ts">
  import { SvelteFlow, Background, Controls } from '@xyflow/svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import '@xyflow/svelte/dist/style.css';
  import './turbo.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import TurboNode from './TurboNode.svelte'
  import TurboEdge from './TurboEdge.svelte'

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  const nodeTypes = {
    turbo: TurboNode
  };

  const edgeTypes = {
    turbo: TurboEdge
  };

  const defaultEdgeOptions = {
    type: 'turbo',
    markerEnd: 'edge-circle'
  };
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {nodeTypes} {edges} {edgeTypes} {defaultEdgeOptions} fitView>
    <Controls showInteractive={false} />
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
</div>
