import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
} from '@xyflow/react';

import { ErasableNode } from './ErasableNode';
import { ErasableEdge } from './ErasableEdge';
import { Eraser } from './Eraser';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'erasable-node',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
  },
  {
    id: '2',
    type: 'erasable-node',
    position: { x: 300, y: 0 },
    data: { label: 'World' },
  },
];

const initialEdges = [
  {
    id: '1->2',
    type: 'erasable-edge',
    source: '1',
    target: '2',
  },
];

const nodeTypes = {
  'erasable-node': ErasableNode,
};

const edgeTypes = {
  'erasable-edge': ErasableEdge,
};

const StressFlow = () => {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      minZoom={0}
      defaultEdgeOptions={{ type: 'erasable-edge' }}
    >
      <Controls />
      <Background />
      <Eraser />
    </ReactFlow>
  );
};

export default StressFlow;
