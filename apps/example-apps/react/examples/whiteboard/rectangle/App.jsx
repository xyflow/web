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

import { BoxNode } from './BoxNode';
import { RectangleTool } from './RectangleTool';

import '@xyflow/react/dist/style.css';

const initialNodes = [];
const initialEdges = [];

const nodeTypes = {
  box: BoxNode,
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
