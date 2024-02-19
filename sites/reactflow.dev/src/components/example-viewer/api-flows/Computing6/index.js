import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import NumberInput from './NumberInput.js';
import ColorPreview from './ColorPreview.js';
import Lightness from './Lightness.js';
import Log from './Log.js';

const nodeTypes = {
  NumberInput,
  ColorPreview,
  Lightness,
  Log,
};

const initialNodes = [
  {
    type: 'NumberInput',
    id: '1',
    data: { label: 'Red', value: 255 },
    position: { x: 0, y: 0 },
  },
  {
    type: 'NumberInput',
    id: '2',
    data: { label: 'Green', value: 0 },
    position: { x: 0, y: 100 },
  },
  {
    type: 'NumberInput',
    id: '3',
    data: { label: 'Blue', value: 115 },
    position: { x: 0, y: 200 },
  },
  {
    type: 'ColorPreview',
    id: 'color',
    position: { x: 150, y: 50 },
    data: {
      label: 'Color',
      value: { r: undefined, g: undefined, b: undefined },
    },
  },
  {
    type: 'Lightness',
    id: 'lightness',
    position: { x: 350, y: 75 },
  },
  {
    id: 'log-1',
    type: 'Log',
    position: { x: 500, y: 0 },
    data: { label: 'Use black font', fontColor: 'black' },
  },
  {
    id: 'log-2',
    type: 'Log',
    position: { x: 500, y: 140 },
    data: { label: 'Use white font', fontColor: 'white' },
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
  {
    id: 'color-lightness',
    source: 'color',
    target: 'lightness',
  },
  {
    id: 'lightness-log-1',
    source: 'lightness',
    sourceHandle: 'light',
    target: 'log-1',
  },
  {
    id: 'lightness-log-2',
    source: 'lightness',
    sourceHandle: 'dark',
    target: 'log-2',
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
