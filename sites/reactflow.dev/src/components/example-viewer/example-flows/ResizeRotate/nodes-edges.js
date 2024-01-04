import { Position } from '@xyflow/react';

export const nodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1', resizable: true },
    type: 'resizeRotate',
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    selected: true,
    style: { width: 180, height: 100 },
  },
  {
    id: '2',
    position: { x: 300, y: 0 },
    data: { label: 'Node 2', rotatable: true },
    type: 'resizeRotate',
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    style: { width: 180, height: 100 },
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
