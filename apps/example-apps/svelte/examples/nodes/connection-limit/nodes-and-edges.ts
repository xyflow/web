import { Position, type Node, type Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 0, y: 25 },
    sourcePosition: Position.Right
  },
  {
    id: '2',
    type: 'custom',
    data: {},
    position: { x: 250, y: 50 }
  },
  {
    id: '3',
    type: 'input',
    data: { label: 'Node 2' },
    position: { x: 0, y: 100 },
    sourcePosition: Position.Right
  }
];

export const initialEdges: Edge[] = [];
