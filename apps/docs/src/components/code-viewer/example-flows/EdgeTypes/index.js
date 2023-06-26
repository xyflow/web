import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

import { getNodesAndEdges } from './utils.js';

const { nodes: initialNodes, edges: initialEdges } = getNodesAndEdges();

const EdgeTypesFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      minZoom={0.2}
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default EdgeTypesFlow;
