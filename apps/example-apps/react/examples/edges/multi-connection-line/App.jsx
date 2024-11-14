import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';


import ConnectionLine from './ConnectionLine';

const initialNodes = [
  {
    id: 'a',
    type: 'input',
    data: { label: 'Click to select' },
    position: { x: 100, y: -100 },
  },
  {
    id: 'b',
    type: 'input',
    data: { label: 'these nodes' },
    position: { x: 300, y: -50 },
  },
  {
    id: 'c',
    type: 'input',
    data: { label: 'then drag... ' },
    position: { x: 150, y: 0 },
  },
  {
    id: 'd',
    type: 'output',
    data: { label: '...and connect to me!' },
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
      style={{ backgroundColor: "#F7F9FB" }}
      >
        <Background />
      </ReactFlow>  
  );
};

export default ConnectionLineFlow;
