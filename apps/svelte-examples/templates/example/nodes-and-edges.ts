import { Position, type Node, type Edge } from '@xyflow/svelte';

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left
};

export const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: {
      label: 'Node 1'
    },
    ...nodeDefaults
  }
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2'
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3'
  }
];
