<script>
  import { writable } from 'svelte/store';
  import { SvelteFlow, Background, Controls } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  const nodes = writable([]);
  const edges = writable([]);
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
