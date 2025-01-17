import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { GhostNode, useIncompleteEdge } from './useIncompleteEdge';

const nodeTypes = {
  ghost: GhostNode,
};

const initialNodes = [
  { id: '0', type: 'input', data: { label: 'A' }, position: { x: 0, y: -100 } },
  { id: '1', type: 'output', data: { label: 'B' }, position: { x: 0, y: 100 } },
];

const IncompleteEdge = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handlers = useIncompleteEdge();

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      {...handlers}
    >
      <Background />
    </ReactFlow>
  );
};

export default () => (
  <ReactFlowProvider>
    <IncompleteEdge />
  </ReactFlowProvider>
);
