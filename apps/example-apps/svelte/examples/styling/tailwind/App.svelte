<script lang="ts">
  import { SvelteFlow, Controls, MiniMap, type Node, type Edge } from '@xyflow/svelte';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import CustomNode from './CustomNode.svelte';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes = {
    custom: CustomNode,
  };
</script>

<div class="w-full h-full">
  <SvelteFlow
    class="bg-teal-50! dark:bg-gray-900!"
    bind:nodes
    {nodeTypes}
    bind:edges
    fitView
    colorMode="system"
  >
    <MiniMap />
    <Controls />
  </SvelteFlow>
</div>
