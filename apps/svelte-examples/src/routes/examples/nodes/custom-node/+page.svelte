<script lang="ts">
  import { SvelteFlow, Background, Controls, MiniMap, Position } from '@xyflow/svelte';
  import type { Node, Edge, SnapGrid } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import ColorSelectorNode from './ColorSelectorNode.svelte';

  import '@xyflow/svelte/dist/style.css';

  const snapGrid: SnapGrid = [10, 10];
  const nodeTypes = {
    selectorNode: ColorSelectorNode
  };

  let bgColor = '#1A192B';

  function onInput(event: Event) {
    $nodes.forEach((node) => {
      if (node.id === '2') {
        bgColor = (event.target as HTMLInputElement)?.value;
      }
    });
    $nodes = $nodes;
  }

  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'An input node' },
      position: { x: 0, y: 50 },
      sourcePosition: Position.Right
    },
    {
      id: '2',
      type: 'selectorNode',
      data: { onInput, color: bgColor },
      style: 'border: 1px solid #777; padding: 10px;',
      position: { x: 300, y: 50 }
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output A' },
      position: { x: 650, y: 25 },
      targetPosition: Position.Left
    },
    {
      id: '4',
      type: 'output',
      data: { label: 'Output B' },
      position: { x: 650, y: 100 },
      targetPosition: Position.Left
    }
  ];

  const initialEdges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
      style: 'stroke: #fff;'
    },
    {
      id: 'e2a-3',
      source: '2',
      target: '3',
      sourceHandle: 'a',
      animated: true,
      style: 'stroke: #fff;'
    },
    {
      id: 'e2b-4',
      source: '2',
      target: '4',
      sourceHandle: 'b',
      animated: true,
      style: 'stroke: #fff;'
    }
  ];

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable(initialEdges);
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} {nodeTypes} style={`background: ${bgColor}`} {snapGrid} fitView>
    <Background />
    <Controls />
    <MiniMap />
  </SvelteFlow>
</div>
