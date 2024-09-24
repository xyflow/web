import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { createNodesAndEdges } from './utils.js';

const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(
  15,
  30,
);

const StressFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [],
  );

  const updatePos = useCallback(() => {
    setNodes((nds) => {
      return nds.map((node) => {
        return {
          ...node,
          position: {
            x: Math.random() * 1500,
            y: Math.random() * 1500,
          },
        };
      });
    });
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      minZoom={0}
    >
      <MiniMap />
      <Controls />
      <Background />

      <button
        onClick={updatePos}
        style={{ position: 'absolute', right: 10, top: 30, zIndex: 4 }}
      >
        change pos
      </button>
    </ReactFlow>
  );
};

export default StressFlow;
