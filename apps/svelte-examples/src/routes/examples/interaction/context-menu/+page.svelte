<script lang="ts">
  import { SvelteFlow, Background, type Node, type Edge } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import ContextMenu from './ContextMenu.svelte';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  import '@xyflow/svelte/dist/style.css';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  let menu: { id: string; top?: number; left?: number; right?: number; bottom?: number } | null;
  let width: number;
  let height: number;

  function handleContextMenu({ detail: { event, node } }) {
    // Prevent native context menu from showing
    event.preventDefault();

    // Calculate position of the context menu. We want to make sure it
    // doesn't get positioned off-screen.
    menu = {
      id: node.id,
      top: event.clientY < height - 200 ? event.clientY : undefined,
      left: event.clientX < width - 200 ? event.clientX : undefined,
      right: event.clientX >= width - 200 ? width - event.clientX : undefined,
      bottom: event.clientY >= height - 200 ? height - event.clientY : undefined
    };
  }

  // Close the context menu if it's open whenever the window is clicked.
  function handlePaneClick() {
    menu = null;
  }
</script>

<div style="height:100vh;" bind:clientWidth={width} bind:clientHeight={height}>
  <SvelteFlow
    {nodes}
    {edges}
    on:nodecontextmenu={handleContextMenu}
    on:paneclick={handlePaneClick}
    fitView
  >
    <Background />
    {#if menu}
      <ContextMenu
        onClick={handlePaneClick}
        id={menu.id}
        top={menu.top}
        left={menu.left}
        right={menu.right}
        bottom={menu.bottom}
      />
    {/if}
  </SvelteFlow>
</div>
