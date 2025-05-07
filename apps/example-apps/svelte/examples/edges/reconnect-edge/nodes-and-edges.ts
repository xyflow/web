import type { Node, Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'Node 1' },
    position: { x: 0, y: 0 },
  },
  { id: '2', data: { label: 'Node 2' }, position: { x: 0, y: 200 } },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 200, y: 0 },
  },
  { id: '4', data: { label: 'Node 4' }, position: { x: 200, y: 200 } },
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    type: 'custom',
    data: {
      label: 'reconnectable edge',
    },
  },
];
