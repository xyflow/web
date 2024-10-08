<script lang="ts">
  import { writable } from 'svelte/store';
  import { SvelteFlow, Background, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  function onNodesDelete(e) {
    console.log(e);
  }
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} on:nodedelete={onNodesDelete} fitView>
    <Background />
  </SvelteFlow>
</div>
