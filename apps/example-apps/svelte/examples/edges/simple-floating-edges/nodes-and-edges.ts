import { type Node, type Edge, MarkerType } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: '🌞' },
    type: 'custom'
  },
  {
    id: '2',
    position: { x: 0, y: 150 },
    data: { label: '🌎' },
    type: 'custom'
  }
];

export const initialEdges: Edge[] = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    sourceHandle: 'c',
    targetHandle: 'a',
    type: 'floating',
    markerEnd: { type: MarkerType.ArrowClosed }
  }
];
