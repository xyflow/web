<script lang="ts">
  import { writable } from 'svelte/store';
  import { SvelteFlow, Background, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/base.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} fitView>
    <Background />
  </SvelteFlow>
</div>
