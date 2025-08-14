import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start here...' },
    position: { x: -150, y: 0 },
  },
  {
    id: '2',
    type: 'input',
    data: { label: '...or here!' },
    position: { x: 150, y: 0 },
  },
  { id: '3', data: { label: 'Delete me.' }, position: { x: 0, y: 100 } },
  { id: '4', data: { label: 'Then me!' }, position: { x: 0, y: 200 } },
  {
    id: '5',
    type: 'output',
    data: { label: 'End here!' },
    position: { x: 0, y: 300 },
  },
];

const initialEdges = [
  { id: '1->3', source: '1', target: '3' },
  { id: '2->3', source: '2', target: '3' },
  { id: '3->4', source: '3', target: '4' },
  { id: '4->5', source: '4', target: '5' },
];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges(addEdge(params, edges)), [edges]);

  const onNodesDelete = useCallback(
    (deleted) => {
      let remainingNodes = [...nodes];
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, remainingNodes, acc);
          const outgoers = getOutgoers(node, remainingNodes, acc);
          const connectedEdges = getConnectedEdges([node], acc);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            })),
          );

          remainingNodes = remainingNodes.filter((rn) => rn.id !== node.id);

          return [...remainingEdges, ...createdEdges];
        }, edges),
      );
    },
    [nodes, edges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onNodesDelete={onNodesDelete}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      attributionPosition="top-right"
    >
      <Background />
    </ReactFlow>
  );
}
