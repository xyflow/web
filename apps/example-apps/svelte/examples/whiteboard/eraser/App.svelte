<script lang="ts">
  import { SvelteFlow, Background, Controls, Panel } from '@xyflow/svelte';

  import ErasableNode, { type ErasableNodeType } from './ErasableNode.svelte';
  import ErasableEdge, { type ErasableEdgeType } from './ErasableEdge.svelte';
  import Eraser from './Eraser.svelte';

  import '@xyflow/svelte/dist/style.css';

  const initialNodes: ErasableNodeType[] = [
    {
      id: '1',
      type: 'erasable-node',
      position: { x: 0, y: 0 },
      data: { label: 'Hello' },
    },
    {
      id: '2',
      type: 'erasable-node',
      position: { x: 300, y: 0 },
      data: { label: 'World' },
    },
  ];

  const initialEdges: ErasableEdgeType[] = [
    {
      id: '1->2',
      type: 'erasable-edge',
      source: '1',
      target: '2',
      data: {},
    },
  ];

  const nodeTypes = {
    'erasable-node': ErasableNode,
  };

  const edgeTypes = {
    'erasable-edge': ErasableEdge,
  };

  let nodes = $state.raw(initialNodes);
  let edges = $state.raw(initialEdges);

  let isEraserActive = $state(true);
</script>

<SvelteFlow
  bind:nodes
  bind:edges
  {nodeTypes}
  {edgeTypes}
  fitView
  defaultEdgeOptions={{ type: 'erasable-edge' }}
>
  <Controls />
  <Background />

  {#if isEraserActive}
    <Eraser />
  {/if}

  <Panel position="top-left" class="controls">
    <div class="xy-theme__button-group">
      <button
        class={['xy-theme__button', isEraserActive && 'active']}
        onclick={() => {
          isEraserActive = true;
        }}
      >
        Eraser Mode
      </button>
      <button
        class={['xy-theme__button', !isEraserActive && 'active']}
        onclick={() => {
          isEraserActive = false;
        }}
      >
        Selection Mode
      </button>
    </div>
  </Panel>
</SvelteFlow>

<style>
  :global .controls {
    z-index: 1001;
  }
</style>
