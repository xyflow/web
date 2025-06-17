import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Panel,
} from '@xyflow/react';
import { Lasso } from './Lasso';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
  },
  {
    id: '2',
    position: { x: 300, y: 0 },
    data: { label: 'World' },
  },
];

const initialEdges = [];

const StressFlow = () => {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  const [partial, setPartial] = useState(false);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      minZoom={0}
    >
      <Controls />
      <Background />
      <Lasso partial={partial} />
      <Panel position="top-right">
        <button onClick={() => setPartial(!partial)}>
          Use {partial ? 'Full' : 'Partial'} Selection
        </button>
      </Panel>
    </ReactFlow>
  );
};

export default StressFlow;
