import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Background } from 'reactflow';
import 'reactflow/dist/style.css';

import ConnectionLine from './ConnectionLine';

const initialNodes = [
  {
    id: 'connectionline-1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
];

const ConnectionLineFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      connectionLineComponent={ConnectionLine}
      onConnect={onConnect}
    >
      <Background variant="lines" />
    </ReactFlow>
  );
};

export default ConnectionLineFlow;
