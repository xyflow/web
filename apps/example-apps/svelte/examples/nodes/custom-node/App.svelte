<script module>
  class SelectedColor {
    current = $state('#ff4000');
  }
  export const selectedColor = new SelectedColor();
</script>

<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    MiniMap,
    Panel,
    Position,
    type Node,
    type Edge,
    Background,
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

<SvelteFlow bind:nodes bind:edges {nodeTypes} fitView colorMode="system">
  <Background />
  <Controls />
  <MiniMap />
  <Panel position="top-right">
    <div class="color-panel">
      <div class="color-swatch" style:background={selectedColor.current}></div>
      <span>
        Selected color:
        <code class="color-value">{selectedColor.current}</code>
      </span>
    </div>
  </Panel>
</SvelteFlow>

<style>
  .color-panel {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid var(--xy-controls-button-border-color, #ddd);
    border-radius: 8px;
    background: var(--xy-controls-button-background-color, #fff);
  }

  .color-swatch {
    width: 16px;
    height: 16px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 999px;
  }

  .color-value {
    font-family: monospace;
    font-variant-numeric: tabular-nums;
  }
</style>
