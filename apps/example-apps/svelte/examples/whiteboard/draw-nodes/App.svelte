<script lang="ts">
  import {
    SvelteFlow,
    Background,
    Controls,
    Panel,
    addEdge,
    type Connection,
  } from '@xyflow/svelte';

  import BoxNode, { type BoxNodeType } from './BoxNode.svelte';
  import DrawNodes from './DrawNodes.svelte';

  import '@xyflow/svelte/dist/style.css';

  const initialNodes: BoxNodeType[] = [];
  const initialEdges: any[] = [];

  const nodeTypes = {
    box: BoxNode,
  };

  let nodes = $state.raw(initialNodes);
  let edges = $state.raw(initialEdges);
  let isDrawing = $state(false);

  function onConnect(params: Connection) {
    edges = addEdge(params, edges);
  }

  function toggleDrawing() {
    isDrawing = !isDrawing;
  }
</script>

<SvelteFlow bind:nodes bind:edges {nodeTypes} {onConnect} minZoom={0} fitView>
  <Controls />
  <Background />
  <Panel position="top-left">
    <button onclick={toggleDrawing} class="draw-button" class:drawing={isDrawing}>
      {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
    </button>
  </Panel>
  {#if isDrawing}
    <DrawNodes />
  {/if}
</SvelteFlow>

<style>
  .draw-button {
    padding: 8px 16px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    background-color: #4dabf7;
    transition: background-color 0.2s ease;
  }

  .draw-button.drawing {
    background-color: #ff6b6b;
  }

  .draw-button:hover {
    opacity: 0.9;
  }
</style>
