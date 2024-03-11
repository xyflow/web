import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  Position,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const CustomNodeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: '1',
      type: 'input',
      data: { label: 'Node 1' },
      position: { x: 0, y: 25 },
      sourcePosition: Position.Right,
    },
    {
      id: '2',
      type: 'custom',
      data: {},
      position: { x: 250, y: 50 },
    },
    {
      id: '3',
      type: 'input',
      data: { label: 'Node 2' },
      position: { x: 0, y: 100 },
      sourcePosition: Position.Right,
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    />
  );
};

export default CustomNodeFlow;
