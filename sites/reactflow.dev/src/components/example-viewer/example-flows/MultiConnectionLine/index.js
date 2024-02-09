import React, { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import ConnectionLine from './ConnectionLine';

const initialNodes = [
  {
    id: 'a',
    type: 'input',
    data: { label: 'Select' },
    position: { x: 100, y: -100 },
  },
  {
    id: 'b',
    type: 'input',
    data: { label: 'these' },
    position: { x: 300, y: -50 },
  },
  {
    id: 'c',
    type: 'input',
    data: { label: 'nodes' },
    position: { x: 150, y: 0 },
  },
  {
    id: 'd',
    type: 'output',
    data: { label: 'D' },
    position: { x: 250, y: 200 },
  },
];

const ConnectionLineFlow = () => {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    ({ source, target }) => {
      return setEdges((eds) =>
        nodes
          .filter((node) => node.id === source || node.selected)
          .reduce(
            (eds, node) => addEdge({ source: node.id, target }, eds),
            eds,
          ),
      );
    },
    [nodes],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      connectionLineComponent={ConnectionLine}
      onConnect={onConnect}
      fitView
      fitViewOptions={{
        padding: 0.2,
      }}
    />
  );
};

export default ConnectionLineFlow;
