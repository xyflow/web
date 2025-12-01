<script lang="ts">
  import { SvelteFlow, Background, Controls, MiniMap, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialEdges, initialNodes } from './nodes-and-edges';
  import { resolveCollisions } from './resolve-collisions';


  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);
</script>

<SvelteFlow bind:nodes bind:edges minZoom={0} fitView onnodedragstop={() => {
  nodes = resolveCollisions(nodes, { maxIterations: Infinity, overlapThreshold: 0.5, margin: 15 });
}}>
  <Background />
  <MiniMap />
  <Controls />
</SvelteFlow>
