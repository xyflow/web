<script lang="ts">
  import { SvelteFlow, Background, ConnectionMode } from '@xyflow/svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import CustomNode from './CustomNode.svelte';
  import SimpleFloatingEdge from './SimpleFloatingEdge.svelte';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  const nodeTypes = {
    custom: CustomNode
  };

  const edgeTypes = {
    floating: SimpleFloatingEdge
  };
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {nodeTypes} {edges} {edgeTypes} fitView connectionMode={ConnectionMode.Loose}>
    <Background />
  </SvelteFlow>
</div>
