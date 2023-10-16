<script lang="ts">
  import { SvelteFlow, Background } from '@xyflow/svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import ContextMenu from './ContextMenu.svelte';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  let menu;

  function handleContextMenu(event) {
    event.preventDefault();
    menu = {
      x: event.clientX,
      y: event.clientY
    };
  }

  function handlePaneClick() {
    menu = null;
  }
</script>

<div style="height:100vh;">
  <SvelteFlow
    {nodes}
    {edges}
    on:nodecontextmenu={handleContextMenu}
    on:paneclick={handlePaneClick}
    fitView
  >
    <Background />
    {#if menu}
      <ContextMenu {...menu} />
    {/if}
  </SvelteFlow>
</div>
