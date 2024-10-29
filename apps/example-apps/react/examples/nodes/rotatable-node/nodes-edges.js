import { Position } from '@xyflow/react';

export const nodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Rotate Me!' },
    type: 'rotatableNode',
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    position: { x: 300, y: 0 },
    data: { label: 'Rotate Me!' },
    type: 'rotatableNode',
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
];

export const edges = [
  {
    id: '1->2',
    source: '1',
    target: '2',
    type: 'smoothstep',
  },
];
