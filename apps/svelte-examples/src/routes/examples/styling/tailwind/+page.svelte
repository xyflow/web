<script lang="ts">
  import { SvelteFlow, Background, Controls, MiniMap } from '@xyflow/svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import './tailwind.css';
  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import CustomNode from './CustomNode.svelte';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  const nodeTypes = {
    custom: CustomNode
  };
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {nodeTypes} {edges} fitView class="bg-teal-50">
    <MiniMap />
    <Controls />
  </SvelteFlow>
</div>
