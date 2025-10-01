<script lang="ts">
  import {
    SvelteFlow,
    Background,
    type Node,
    type Edge,
    type NodeEventWithPointer,
  } from '@xyflow/svelte';

  import ContextMenu from './ContextMenu.svelte';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  let menu: {
    id: string;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  } | null = $state(null);
  let clientWidth: number = $state(0);
  let clientHeight: number = $state(0);

  const handleContextMenu: NodeEventWithPointer<MouseEvent> = ({ event, node }) => {
    // Prevent native context menu from showing
    event.preventDefault();

    // Calculate position of the context menu. We want to make sure it
    // doesn't get positioned off-screen.
    menu = {
      id: node.id,
      top: event.clientY < clientHeight - 200 ? event.clientY : undefined,
      left: event.clientX < clientWidth - 200 ? event.clientX : undefined,
      right: event.clientX >= clientWidth - 200 ? clientWidth - event.clientX : undefined,
      bottom:
        event.clientY >= clientHeight - 200 ? clientHeight - event.clientY : undefined,
    };
  };

  // Close the context menu if it's open whenever the window is clicked.
  function handlePaneClick() {
    menu = null;
  }
</script>

<div style="height:100vh;" bind:clientWidth bind:clientHeight>
  <SvelteFlow
    bind:nodes
    bind:edges
    onnodecontextmenu={handleContextMenu}
    onpaneclick={handlePaneClick}
    onpointerdown={handlePaneClick}
    fitView
  >
    <Background />
    {#if menu}
      <ContextMenu
        onclick={handlePaneClick}
        id={menu.id}
        top={menu.top}
        left={menu.left}
        right={menu.right}
        bottom={menu.bottom}
      />
    {/if}
  </SvelteFlow>
</div>
