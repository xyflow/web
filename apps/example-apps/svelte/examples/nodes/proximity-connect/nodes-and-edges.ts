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
      label: '⬛️'
    },
    ...nodeDefaults
  },
  {
    id: '2',
    position: { x: 250, y: -100 },
    data: {
      label: '🟩'
    },
    ...nodeDefaults
  },
  {
    id: '3',
    position: { x: 250, y: 100 },
    data: {
      label: '🟧'
    },
    ...nodeDefaults
  },
  {
    id: '4',
    position: { x: 500, y: 0 },
    data: {
      label: '🟦'
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
