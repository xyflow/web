import {
  Background,
  Controls,
  Edge,
  EdgeTypes,
  MiniMap,
  Node,
  Position,
  ReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { EdgeWithToolbar } from './EdgeWithToolbar';
import { EdgeWithButton } from './EdgeWithButton';

const edgeTypes: EdgeTypes = {
  edgeButton: EdgeWithButton,
  edgeToolbar: EdgeWithToolbar,
};

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 150, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 550, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },

  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 0, y: 300 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 750, y: 200 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'edgeButton',
  },

  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'edgeToolbar',
  },
];

export default function EdgeToolbarExample() {
  return (
    <ReactFlow
      defaultNodes={initialNodes}
      defaultEdges={initialEdges}
      fitView
      edgeTypes={edgeTypes}
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}
