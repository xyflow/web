import type { Node, Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 150 }, data: { label: 'base style 1' } },
  { id: '2', position: { x: 250, y: 0 }, data: { label: 'base style 2' } },
  { id: '3', position: { x: 250, y: 150 }, data: { label: 'base style 3' } },
  { id: '4', position: { x: 250, y: 300 }, data: { label: 'base style 4' } }
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
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4'
  }
];
