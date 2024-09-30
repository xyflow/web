<script lang="ts">
  import { writable } from 'svelte/store';
  import { SvelteFlow, Background, type Edge, type Node } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  // the custom edge marker is an SVG with a marker element.
  // That marker has the id "logo". We can use that id to reference it,
  // by using the markerStart and markerEnd edge options.
  import CustomEdgeMarker from './CustomEdgeMarker.svelte';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} fitView>
    <CustomEdgeMarker />
    <Background />
  </SvelteFlow>
</div>
