<script>
  import { SvelteFlow, Background, Controls, MiniMap, Panel } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';
  import CustomNode from './CustomNode.svelte';
  import CustomEdge from './CustomEdge.svelte';

  const nodeTypes = {
    fadeInOut: CustomNode,
  };

  const edgeTypes = {
    fadeOut: CustomEdge,
  };

  const initialNodes = [
    {
      id: '1',
      type: 'fadeInOut',
      position: { x: 0, y: 0 },
      data: { label: 'Hello' },
    },
    {
      id: '2',
      type: 'fadeInOut',
      position: { x: 300, y: 0 },
      data: { label: 'World' },
    },
  ];

  const initialEdges = [
    {
      id: '1->2',
      type: 'fadeOut',
      source: '1',
      target: '2',
    },
  ];

  let nodes = $state.raw(initialNodes);
  let edges = $state.raw(initialEdges);
</script>

<SvelteFlow bind:nodes bind:edges {nodeTypes} {edgeTypes} minZoom={0} fitView>
  <Background />
  <MiniMap />
  <Controls />
  <Panel position="top-left">
    <button
      class="xy-theme__button"
      onclick={() => {
        nodes = [
          ...nodes,
          {
            id: window.crypto.randomUUID(),
            type: 'fadeInOut',
            position: {
              x: Math.random() * 300,
              y: Math.random() * 200 - 100,
            },
            data: { label: 'New Node' },
          },
        ];
      }}>Add node</button
    >
  </Panel>
</SvelteFlow>
