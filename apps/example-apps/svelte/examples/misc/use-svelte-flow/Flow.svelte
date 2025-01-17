<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw([
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 150, y: 5 },
    },
    {
      id: '2',
      type: 'default',
      data: { label: 'Default Node' },
      position: { x: 0, y: 150 },
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 300, y: 150 },
    },
  ]);

  let edges = $state.raw([
    {
      id: '1-2',
      type: 'default',
      source: '1',
      target: '2',
    },
    {
      id: '1-3',
      type: 'smoothstep',
      source: '1',
      target: '3',
    },
  ]);
</script>

<main>
  <SvelteFlow bind:nodes bind:edges fitView>
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
  </SvelteFlow>
</main>

<style>
  main {
    height: 100vh;
    display: flex;
  }
</style>
