import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Panel,
} from '@xyflow/react';

import { BoxNode } from './BoxNode';
import { DrawNodes } from './DrawNodes';

import '@xyflow/react/dist/style.css';

const initialNodes = [];
const initialEdges = [];

const nodeTypes = {
  box: BoxNode,
};

const StressFlow = () => {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isDrawing, setIsDrawing] = useState(false);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  const toggleDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      minZoom={0}
    >
      <Controls />
      <Background />
      <Panel position="top-left">
        <button
          onClick={toggleDrawing}
          style={{
            padding: '8px 16px',
            backgroundColor: isDrawing ? '#ff6b6b' : '#4dabf7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
        </button>
      </Panel>
      {isDrawing && <DrawNodes />}
    </ReactFlow>
  );
};

export default StressFlow;
