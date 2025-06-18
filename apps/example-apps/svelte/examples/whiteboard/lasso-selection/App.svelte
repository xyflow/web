<script lang="ts">
  import { SvelteFlow, Background, Controls, MiniMap, Panel } from '@xyflow/svelte';
  import type { Edge } from '@xyflow/svelte';

  import Lasso from './Lasso.svelte';

  import '@xyflow/svelte/dist/style.css';

  const initialNodes = [
    {
      id: '1',
      position: { x: 0, y: 0 },
      data: { label: 'Hello' },
    },
    {
      id: '2',
      position: { x: 300, y: 0 },
      data: { label: 'World' },
    },
  ];

  const initialEdges: Edge[] = [];

  let nodes = $state.raw(initialNodes);
  let edges = $state.raw(initialEdges);

  let isLassoActive = $state(true);
  let partial = $state(false);
</script>

<SvelteFlow bind:nodes bind:edges fitView>
  <Background />
  <MiniMap />
  <Controls />

  {#if isLassoActive}
    <Lasso {partial} />
  {/if}

  <Panel position="top-left">
    <button
      class={['xy-theme__button', isLassoActive && 'active']}
      onclick={() => (isLassoActive = !isLassoActive)}
    >
      Lasso {isLassoActive ? 'Active' : 'Inactive'}
    </button>
    <label>
      <input
        type="checkbox"
        checked={partial}
        onchange={() => (partial = !partial)}
        class="xy-theme__checkbox"
      />
      Partial selection
    </label>
  </Panel>
</SvelteFlow>
