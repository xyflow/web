import { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import DetachedHandleNode from './DetachedHandleNode';

const nodeTypes = {
  detached: DetachedHandleNode,
};

const initialNodes = [
  {
    id: '1',
    data: { label: 'Detached Handle' },
    type: 'detached',
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Node' },
    type: 'output',
    targetPosition: 'left',
    position: { x: 250, y: 0 },
    width: 100,
  },
];

function DetachedHandleFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}

export default DetachedHandleFlow;
