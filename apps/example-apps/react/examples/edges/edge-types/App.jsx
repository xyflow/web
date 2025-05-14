import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    data: { label: 'choose' },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: '2',
    data: { label: 'your' },
    position: {
      x: 100,
      y: 100,
    },
  },
  {
    id: '3',
    data: { label: 'desired' },
    position: {
      x: 0,
      y: 200,
    },
  },
  {
    id: '4',
    data: { label: 'edge' },
    position: {
      x: 100,
      y: 300,
    },
  },
  {
    id: '5',
    data: { label: 'type' },
    position: {
      x: 0,
      y: 400,
    },
  },
];

const initialEdges = [
  {
    id: '1',
    type: 'straight',
    source: '1',
    target: '2',
    label: 'straight',
  },
  {
    type: 'step',
    source: '2',
    target: '3',
    id: '2',
    label: 'step',
  },
  {
    type: 'smoothstep',
    source: '3',
    target: '4',
    id: '3',
    label: 'smoothstep',
  },
  {
    type: 'bezier',
    source: '4',
    target: '5',
    id: '4',
    label: 'bezier',
  },
];

const EdgeTypesFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

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
