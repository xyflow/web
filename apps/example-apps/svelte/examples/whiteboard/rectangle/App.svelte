<script lang="ts">
  import {
    SvelteFlow,
    Background,
    Controls,
    Panel,
    addEdge,
    type Connection,
  } from '@xyflow/svelte';

  import RectangleNode, { type RectangleNodeType } from './RectangleNode.svelte';
  import RectangleTool from './RectangleTool.svelte';

  import '@xyflow/svelte/dist/style.css';

  const initialNodes: RectangleNodeType[] = [];
  const initialEdges: any[] = [];

  const nodeTypes = {
    rectangle: RectangleNode,
  };

  let nodes = $state.raw(initialNodes);
  let edges = $state.raw(initialEdges);
  let isRectangleActive = $state(true);

  function onConnect(params: Connection) {
    edges = addEdge(params, edges);
  }
</script>

<SvelteFlow bind:nodes bind:edges {nodeTypes} {onConnect}>
  <Controls />
  <Background />

  <Panel position="top-left">
    <div class="xy-theme__button-group">
      <button
        class={['xy-theme__button', isRectangleActive && 'active']}
        onclick={() => () => (isRectangleActive = true)}
      >
        Rectangle Mode
      </button>
      <button
        class={['xy-theme__button', !isRectangleActive && 'active']}
        onclick={() => () => (isRectangleActive = false)}
      >
        Selection Mode
      </button>
    </div>
  </Panel>
  {#if isRectangleActive}
    <RectangleTool />
  {/if}
</SvelteFlow>
