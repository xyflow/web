'use client';

import { FC } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  Position,
} from '@xyflow/react';
import { useFramework } from '../../../hooks/use-framework';

const defaultNodeOptions = {
  targetPosition: Position.Left,
  sourcePosition: Position.Right,
};

const reactColors = {
  a: '#0050ff',
  b: '#a845d0',
  c: '#a845d0',
  d: '#ff2e8b',
};

const svelteColors = {
  a: '#FC4545',
  b: '#fb6432',
  c: '#fb6432',
  d: '#FFBA42',
};

export const FlowC = () => {
  const { framework } = useFramework();
  // Choose the color set based on the framework
  const colors = framework === 'svelte' ? svelteColors : reactColors;

  const nodes: Node[] = [
    {
      id: 'a',
      type: 'input',
      data: { label: 'A' },
      position: { x: 0, y: 0 },
      style: {
        width: 50,
        backgroundColor: colors.a,
        borderColor: 'white',
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      ...defaultNodeOptions,
    },
    {
      id: 'b',
      data: { label: 'B' },
      position: { x: 150, y: -50 },
      style: {
        width: 50,
        backgroundColor: colors.b,
        borderColor: 'white',
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      ...defaultNodeOptions,
    },
    {
      id: 'c',
      data: { label: 'C' },
      position: { x: 150, y: 50 },
      style: {
        width: 50,
        backgroundColor: colors.c,
        borderColor: 'white',
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      ...defaultNodeOptions,
    },
    {
      id: 'd',
      data: { label: 'D' },
      position: { x: 300, y: 0 },
      style: {
        width: 50,
        backgroundColor: colors.d,
        borderColor: 'white',
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      ...defaultNodeOptions,
    },
  ];

  const edges = [
    {
      id: 'a-b',
      source: 'a',
      target: 'b',
      type: 'smoothstep',
    },
    {
      id: 'a-c',
      source: 'a',
      target: 'c',
      type: 'smoothstep',
    },
    {
      id: 'b-d',
      source: 'b',
      target: 'd',
      type: 'smoothstep',
    },
  ];

  const proOptions = { hideAttribution: true };
  const fitViewOptions = { padding: 0.2 };
  const nodeColor = (node: Node) => node.style?.backgroundColor || '#eee';

  return (
    <ReactFlow
      id="c"
      className="home-flow-c"
      defaultNodes={nodes}
      defaultEdges={edges}
      fitView
      fitViewOptions={fitViewOptions}
      proOptions={proOptions}
      preventScrolling={false}
    >
      <Background
        id="b-1"
        variant={BackgroundVariant.Lines}
        gap={10}
        lineWidth={1}
        color="#f2f2f2"
      />
      <Background
        id="b-2"
        variant={BackgroundVariant.Lines}
        gap={100}
        lineWidth={2}
        color="#eee"
      />
      <Controls showInteractive={false} />
      <MiniMap style={{ height: 100 }} nodeColor={nodeColor} />
    </ReactFlow>
  );
};

