import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

import initialNodes from './nodes.js';
import initialEdges from './edges.js';

const EdgesFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      snapToGrid={true}
      fitView
      attributionPosition="top-right"
    />
  );
};

export default EdgesFlow;
