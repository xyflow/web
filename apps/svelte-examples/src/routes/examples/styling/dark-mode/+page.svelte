<script lang="ts">
  import { writable } from 'svelte/store';
  import {
    SvelteFlow,
    Background,
    Panel,
    type Node,
    type Edge,
    type ColorMode
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  let colorMode: ColorMode = 'dark';
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} {colorMode} fitView>
    <Background />

    <Panel>
      <select bind:value={colorMode}>
        <option value="dark">dark</option>
        <option value="light">light</option>
        <option value="system">system</option>
      </select>
    </Panel>
  </SvelteFlow>
</div>
