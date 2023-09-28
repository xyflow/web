import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Controls, updateEdge, addEdge } from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          Node <strong>A</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: (
        <>
          Node <strong>B</strong>
        </>
      ),
    },
    position: { x: 75, y: 0 },
  },
  {
    id: '3',
    data: {
      label: (
        <>
          Node <strong>C</strong>
        </>
      ),
    },
    position: { x: 400, y: 100 },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180,
    },
  },
  {
    id: '4',
    data: {
      label: (
        <>
          Node <strong>D</strong>
        </>
      ),
    },
    position: { x: -75, y: 100 },
  },
  {
    id: '5',
    data: {
      label: (
        <>
          Node <strong>E</strong>
        </>
      ),
    },
    position: { x: 150, y: 100 },
  },
  {
    id: '6',
    data: {
      label: (
        <>
          Node <strong>F</strong>
        </>
      ),
    },
    position: { x: 150, y: 250 },
  },
];

const initialEdges = [
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    label: 'This edge can only be updated from source',
    updatable: 'source',
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    label: 'This edge can only be updated from target',
    updatable: 'target',
  },
  { id: 'e5-6', source: '5', target: '6', label: 'This edge can be updated from both sides' },
];

const UpdatableEdge = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // gets called after end of edge gets dragged to another source or target
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      snapToGrid
      onEdgeUpdate={onEdgeUpdate}
      onConnect={onConnect}
      fitView
      attributionPosition="top-right"
    >
      <Controls />
    </ReactFlow>
  );
};

export default UpdatableEdge;
