<script>
  import { SvelteFlow, Background, Controls } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw([
    {
      id: '1', // required and needs to be a string
      position: { x: 0, y: 0 }, // required
      data: { label: 'hey' }, // required
    },
    {
      id: '2',
      position: { x: 100, y: 100 },
      data: { label: 'world' },
    },
  ]);

  let edges = $state.raw([]);
</script>

<main>
  <SvelteFlow bind:nodes bind:edges>
    <Background />
    <Controls />
  </SvelteFlow>
</main>

<style>
  main {
    height: 100vh;
  }
</style>
