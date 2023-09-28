import React, { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  Position,
  ConnectionMode,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import ButtonEdge from './ButtonEdge';
import SelfConnectingEdge from './SelfConnectingEdge';
import BiDirectionalEdge from './BiDirectionalEdge';
import BiDirectionalNode from './BiDirectionalNode';

const initialNodes: Node[] = [
  {
    id: 'button-1',
    type: 'input',
    data: { label: 'Button Edge 1' },
    position: { x: 125, y: 0 },
  },
  { id: 'button-2', data: { label: 'Button Edge 2' }, position: { x: 125, y: 200 } },
  {
    id: 'bi-1',
    data: { label: 'Bi Directional 1' },
    position: { x: 0, y: 300 },
    type: 'bidirectional',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'bi-2',
    data: { label: 'Bi Directional 2' },
    position: { x: 250, y: 300 },
    type: 'bidirectional',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'self-1',
    data: { label: 'Self Connecting' },
    position: { x: 125, y: 500 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

const initialEdges: Edge[] = [
  {
    id: 'edge-button',
    source: 'button-1',
    target: 'button-2',
    type: 'buttonedge',
  },
  {
    id: 'edge-bi-1',
    source: 'bi-1',
    target: 'bi-2',
    type: 'bidirectional',
    sourceHandle: 'right',
    targetHandle: 'left',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge-bi-2',
    source: 'bi-2',
    target: 'bi-1',
    type: 'bidirectional',
    sourceHandle: 'left',
    targetHandle: 'right',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge-self',
    source: 'self-1',
    target: 'self-1',
    type: 'selfconnecting',
    markerEnd: { type: MarkerType.Arrow },
  },
];

const edgeTypes = {
  bidirectional: BiDirectionalEdge,
  selfconnecting: SelfConnectingEdge,
  buttonedge: ButtonEdge,
};

const nodeTypes = {
  bidirectional: BiDirectionalNode,
};

const EdgesFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      snapToGrid={true}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      fitView
      attributionPosition="top-right"
      connectionMode={ConnectionMode.Loose}
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default EdgesFlow;
