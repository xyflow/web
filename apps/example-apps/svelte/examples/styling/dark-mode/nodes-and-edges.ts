import { type Node, type Edge, Position } from '@xyflow/svelte';

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left
};

export const initialNodes: Node[] = [
  { id: 'A', position: { x: 0, y: 150 }, data: { label: 'A' }, ...nodeDefaults },
  { id: 'B', position: { x: 250, y: 0 }, data: { label: 'B' }, ...nodeDefaults },
  { id: 'C', position: { x: 250, y: 150 }, data: { label: 'C' }, ...nodeDefaults },
  { id: 'D', position: { x: 250, y: 300 }, data: { label: 'D' }, ...nodeDefaults }
];

export const initialEdges: Edge[] = [
  {
    id: 'a-b',
    source: 'A',
    target: 'B'
  },
  {
    id: 'a-c',
    source: 'A',
    target: 'C'
  },
  {
    id: 'a-d',
    source: 'A',
    target: 'D'
  }
];
