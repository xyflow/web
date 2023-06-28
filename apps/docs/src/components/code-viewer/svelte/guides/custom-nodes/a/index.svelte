<script>
  import { writable } from 'svelte/store';
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    Position,
  } from '@xyflow/svelte';
  import { CustomNode } from './custom-node';

  const nodeTypes = {
    colorNode: CustomNode,
  };

  const bgColor = writable('#1A192B');

  const onChange = (event) => {
    nodes.update((nds) =>
      nds.map((node) => {
        if (node.type !== 'colorNode') {
          return node;
        }

        const color = event.target.value;

        bgColor.set(color);

        return {
          ...node,
          data: {
            ...node.data,
            color,
          },
        };
      })
    );
  };

  const nodes = writable([
    {
      id: '1',
      type: 'input',
      data: { label: 'An input node' },
      position: { x: 0, y: 50 },
      sourcePosition: Position.Right,
    },
    {
      id: '2',
      type: 'colorNode',
      data: { onChange: onChange, color: bgColor },
      style: 'border: 1px solid #777; padding: 10px',
      position: { x: 250, y: 50 },
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
      position: { x: 650, y: 120 },
      targetPosition: Position.Left,
    },
  ]);

  const edges = writable([
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
    },
    {
      id: 'e2a-3',
      source: '2',
      sourceHandle: 'a',
      target: '3',
      animated: true,
    },
    {
      id: 'e2b-4',
      source: '2',
      sourceHandle: 'b',
      target: '4',
      animated: true,
    },
  ]);
</script>

<SvelteFlow {nodes} {edges} {nodeTypes} fitView>
  <Controls />
  <Background variant={BackgroundVariant.Dots} />
  <MiniMap />
</SvelteFlow>

<style>
  :global(.svelte-flow) {
    background: var(--bgcolor);
  }
</style>
