<script lang="ts">
  import { SvelteFlow, Background } from '@xyflow/svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

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
