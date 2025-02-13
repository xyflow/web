'use client'

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

const defaultNodeOptions = {
  targetPosition: Position.Left,
  sourcePosition: Position.Right,
};

const nodes: Node[] = [
  {
    id: 'a',
    type: 'input',
    data: { label: 'A' },
    position: { x: 0, y: 0 },
    style: {
      width: 50,
      backgroundColor: '#0050ff',
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
      backgroundColor: '#a845d0',
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
      backgroundColor: '#a845d0',
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
      backgroundColor: '#ff2e8b',
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
const nodeColor = (node) => node.style.backgroundColor || '#eee';

export const FlowC: FC = () => {
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
}
