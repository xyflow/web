import { Position, type Node, type Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {}
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 320 },
    data: {}
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 40, y: 300 },
    data: {}
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 300, y: 0 },
    data: {}
  }
];

export const initialEdges: Edge[] = [];
