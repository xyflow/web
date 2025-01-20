<script>
  import { SvelteFlow, Background, Controls } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw([]);
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
