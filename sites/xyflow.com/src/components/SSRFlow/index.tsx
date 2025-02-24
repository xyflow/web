'use client';

import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Position,
  type OnConnect,
  type Edge,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodeDimensions = {
  width: 150,
  height: 40,
};

const initialNodes: Node[] = [
  {
    id: 'A',
    type: 'input',
    position: { x: 75, y: 0 },
    data: { label: 'This flow' },
    ...nodeDimensions,
    handles: [
      {
        type: 'source',
        position: Position.Bottom,
        x: nodeDimensions.width / 2,
        y: nodeDimensions.height,
      },
    ],
  },
  {
    id: 'B',
    type: 'output',
    position: { x: 0, y: 100 },
    data: { label: 'still works' },
    ...nodeDimensions,
    handles: [
      {
        type: 'target',
        position: Position.Top,
        x: nodeDimensions.width / 2,
        y: 0,
      },
    ],
  },
  {
    id: 'C',
    type: 'output',
    position: { x: 150, y: 200 },
    data: { label: 'if you turn off JS' },
    ...nodeDimensions,
    handles: [
      {
        type: 'target',
        position: Position.Top,
        x: nodeDimensions.width / 2,
        y: 0,
      },
    ],
  },
];

const initialEdges: Edge[] = [
  {
    id: 'A-B',
    source: 'A',
    target: 'B',
  },
  {
    id: 'A-C',
    source: 'A',
    target: 'C',
  },
];

function SSRFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ height: 400 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

export default SSRFlow;
