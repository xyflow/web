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

  let edges = $state.raw([{ id: '1-2', source: '1', target: '2' }]);
</script>

<main>
  <SvelteFlow bind:nodes bind:edges fitView>
    <Background bgColor="rgba(126,159,219,0.5)" patternColor="white" />
    <Controls showInteractive={false} />
  </SvelteFlow>
</main>

<style>
  main {
    height: 100vh;
  }
</style>
