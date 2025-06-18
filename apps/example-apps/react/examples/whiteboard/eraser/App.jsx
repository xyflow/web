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

import { ErasableNode } from './ErasableNode';
import { ErasableEdge } from './ErasableEdge';
import { Eraser } from './Eraser';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'erasable-node',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
  },
  {
    id: '2',
    type: 'erasable-node',
    position: { x: 300, y: 0 },
    data: { label: 'World' },
  },
];

const initialEdges = [
  {
    id: '1->2',
    type: 'erasable-edge',
    source: '1',
    target: '2',
  },
];

const nodeTypes = {
  'erasable-node': ErasableNode,
};

const edgeTypes = {
  'erasable-edge': ErasableEdge,
};

const defaultEdgeOptions = {
  type: 'erasable-edge',
};

export default function EraserFlow() {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  const [isEraserActive, setIsEraserActive] = useState(true);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <Controls />
      <Background />

      {isEraserActive && <Eraser />}

      <Panel position="left-top">
        <button
          className={`xy-theme__button ${isEraserActive ? 'active' : ''}`}
          onClick={() => setIsEraserActive((enabled) => !enabled)}
        >
          Eraser {isEraserActive ? 'Active' : 'Inactive'}
        </button>
      </Panel>
    </ReactFlow>
  );
}
