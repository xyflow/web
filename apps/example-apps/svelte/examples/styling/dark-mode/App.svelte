<script lang="ts">
  import {
    SvelteFlow,
    Background,
    Controls,
    MiniMap,
    Panel,
    type Node,
    type Edge,
    type ColorMode,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  let colorMode: ColorMode = $state('system');
</script>

<SvelteFlow bind:nodes bind:edges {colorMode} fitView>
  <Background />
  <Controls />
  <MiniMap />

  <Panel>
    <select bind:value={colorMode}>
      <option value="dark">dark</option>
      <option value="light">light</option>
      <option value="system">system</option>
    </select>
  </Panel>
</SvelteFlow>
