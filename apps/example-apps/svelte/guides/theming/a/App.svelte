<script>
  import { SvelteFlow, Background, Controls, Position } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };

  let nodes = $state.raw([
    {
      id: '1',
      position: { x: 0, y: 150 },
      data: { label: 'default style 1' },
      ...nodeDefaults,
    },
    {
      id: '2',
      position: { x: 250, y: 0 },
      data: { label: 'default style 2' },
      ...nodeDefaults,
    },
    {
      id: '3',
      position: { x: 250, y: 150 },
      data: { label: 'default style 3' },
      ...nodeDefaults,
    },
    {
      id: '4',
      position: { x: 250, y: 300 },
      data: { label: 'default style 4' },
      ...nodeDefaults,
    },
  ]);

  let edges = $state.raw([
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
    },
    {
      id: 'e1-4',
      source: '1',
      target: '4',
    },
  ]);
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
