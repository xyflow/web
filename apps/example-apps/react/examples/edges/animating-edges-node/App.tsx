import React from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
} from '@xyflow/react';

import { AnimatedNodeEdge } from './AnimatedNodeEdge';

const initialNodes = [
  { id: '1', position: { x: -100, y: -200 }, data: { label: 'A' } },
  { id: '2', position: { x: 100, y: 200 }, data: { label: 'B' } },
  { id: '3', position: { x: 0, y: 0 }, data: { label: 'C' } },
];

const edgeTypes = {
  animatedNode: AnimatedNodeEdge,
};

const initialEdges = [
  {
    id: '1->2',
    type: 'animatedNode',
    source: '1',
    target: '2',
    data: { node: '3' },
  },
];

const EdgesFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      style={{ backgroundColor: "#F7F9FB" }}
      >
        <Background />
    </ReactFlow>
  );
};

export default EdgesFlow;
