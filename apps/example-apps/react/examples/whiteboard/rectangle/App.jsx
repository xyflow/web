import { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Panel,
} from '@xyflow/react';

import { RectangleNode } from './RectangleNode';
import { RectangleTool } from './RectangleTool';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'rectangle',
    position: { x: 250, y: 5 },
    data: { color: '#ff7000' },
    width: 150,
    height: 100,
  },
];
const initialEdges = [];

const nodeTypes = {
  rectangle: RectangleNode,
};

export default function RectangleFlow() {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  const [isRectangleActive, setIsRectangleActive] = useState(true);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Controls />
      <Background />

      {isRectangleActive && <RectangleTool />}

      <Panel position="top-left">
        <div className="xy-theme__button-group">
          <button
            className={`xy-theme__button ${isRectangleActive ? 'active' : ''}`}
            onClick={() => setIsRectangleActive(true)}
          >
            Rectangle Mode
          </button>
          <button
            className={`xy-theme__button ${!isRectangleActive ? 'active' : ''}`}
            onClick={() => setIsRectangleActive(false)}
          >
            Selection Mode
          </button>
        </div>
      </Panel>
    </ReactFlow>
  );
}
