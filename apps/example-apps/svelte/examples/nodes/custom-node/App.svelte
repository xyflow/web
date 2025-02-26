<script module>
  class BgColor {
    current = $state('#f7f9fb');
  }
  export const bgColor = new BgColor();
</script>

<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    MiniMap,
    Position,
    type Node,
    type Edge,
  } from '@xyflow/svelte';

  import ColorSelectorNode from './ColorSelectorNode.svelte';

  import '@xyflow/svelte/dist/style.css';

  const nodeTypes = {
    selectorNode: ColorSelectorNode,
  };

  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'An input node' },
      position: { x: 0, y: 50 },
      sourcePosition: Position.Right,
    },
    {
      id: '2',
      type: 'selectorNode',
      data: {},
      position: { x: 300, y: 50 },
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output A' },
      position: { x: 650, y: 25 },
      targetPosition: Position.Left,
    },
    {
      id: '4',
      type: 'output',
      data: { label: 'Output B' },
      position: { x: 650, y: 100 },
      targetPosition: Position.Left,
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
    },
    {
      id: 'e2a-3',
      source: '2',
      target: '3',
      animated: true,
    },
    {
      id: 'e2b-4',
      source: '2',
      target: '4',
      animated: true,
    },
  ];

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);
</script>

<SvelteFlow
  bind:nodes
  bind:edges
  {nodeTypes}
  style="background: {bgColor.current};"
  fitView
>
  <Controls />
  <MiniMap />
</SvelteFlow>
