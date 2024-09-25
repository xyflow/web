import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import NumberInput from './NumberInput';
import ColorPreview from './ColorPreview';

const nodeTypes = {
  NumberInput,
  ColorPreview,
};

const initialNodes = [
  {
    type: 'NumberInput',
    id: '1',
    data: { label: 'Red' },
    position: { x: 0, y: 0 },
  },
  {
    type: 'NumberInput',
    id: '2',
    data: { label: 'Green' },
    position: { x: 0, y: 100 },
  },
  {
    type: 'NumberInput',
    id: '3',
    data: { label: 'Blue' },
    position: { x: 0, y: 200 },
  },
  {
    type: 'ColorPreview',
    id: 'color',
    position: { x: 150, y: 50 },
    data: { label: 'Color' },
  },
];

const initialEdges = [
  {
    id: '1-color',
    source: '1',
    target: 'color',
    targetHandle: 'red',
  },
  {
    id: '2-color',
    source: '2',
    target: 'color',
    targetHandle: 'green',
  },
  {
    id: '3-color',
    source: '3',
    target: 'color',
    targetHandle: 'blue',
  },
];

function ReactiveFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
    </ReactFlow>
  );
}

export default ReactiveFlow;
