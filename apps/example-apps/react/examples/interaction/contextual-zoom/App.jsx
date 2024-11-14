import React, { useCallback } from 'react';
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';


import ZoomNode from './ZoomNode';

const snapGrid = [20, 20];
const nodeTypes = {
  zoom: ZoomNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'zoom',
    data: {
      content: <>Zoom to toggle content and placeholder</>,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'zoom',
    data: { content: <>this is a node with some lines of text in it.</> },
    position: { x: 200, y: 0 },
  },
  {
    id: '3',
    type: 'zoom',
    data: { content: <>this is another node with some more text.</> },
    position: { x: 400, y: 0 },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
  },
];

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const ContextualZoomFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultViewport={defaultViewport}
      attributionPosition="top-right"
      fitView
      style={{ backgroundColor: "#F7F9FB" }}
      >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

export default ContextualZoomFlow;
