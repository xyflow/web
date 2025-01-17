<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    Background,
    type Node,
    type Edge,
  } from '@xyflow/svelte';

  import DragHandleNode from './DragHandleNode.svelte';

  import '@xyflow/svelte/dist/style.css';

  const nodeTypes = {
    dragHandleNode: DragHandleNode,
  };

  let nodes = $state.raw<Node[]>([
    {
      id: '2',
      type: 'dragHandleNode',
      // Specify the custom class acting as a drag handle
      dragHandle: '.custom-drag-handle',
      style: 'border: 1px solid #ddd;',
      position: { x: 200, y: 200 },
      data: {
        label: 'Drag Handle',
      },
    },
  ]);

  let edges = $state.raw<Edge[]>([]);
</script>

<SvelteFlow bind:nodes bind:edges {nodeTypes} fitView>
  <Controls />
  <Background />
</SvelteFlow>
