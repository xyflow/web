import { useCallback } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState } from 'reactflow';
import CustomEdge from './CustomEdge';

import 'reactflow/dist/style.css';

const initialNodes = [
  { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
  { id: 'b', position: { x: 0, y: 100 }, data: { label: 'Node B' } },
  { id: 'c', position: { x: 0, y: 200 }, data: { label: 'Node C' } },
];

const initialEdges = [
  { id: 'a->b', type: 'custom-edge', source: 'a', target: 'b' },
  { id: 'b->c', type: 'custom-edge', source: 'b', target: 'c' },
];

const edgeTypes = {
  'custom-edge': CustomEdge,
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: 'custom-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      edgeTypes={edgeTypes}
      fitView
    />
  );
}

export default Flow;
