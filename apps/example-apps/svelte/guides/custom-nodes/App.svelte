<script>
  import { SvelteFlow, Background } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';

  import TextUpdaterNode from './TextUpdaterNode.svelte';

  const nodeTypes = {
    textUpdater: TextUpdaterNode,
  };

  let nodes = $state.raw([
    {
      id: 'node-1',
      type: 'textUpdater',
      position: { x: 0, y: 0 },
      data: { text: 'some text' },
    },
  ]);
</script>

<SvelteFlow bind:nodes {nodeTypes} fitView>
  <Background />
</SvelteFlow>
