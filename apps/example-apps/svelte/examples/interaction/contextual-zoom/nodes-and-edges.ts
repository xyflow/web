import type { Node, Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'zoom',
    data: {
      content: 'zoom in/out to toggle content and placeholder',
      zoomLevel: 1.5
    },
    position: { x: 0, y: 0 }
  },
  {
    id: '2',
    type: 'zoom',
    data: {
      content: 'zoom out some more',
      zoomLevel: 1.0
    },
    position: { x: 0, y: 100 }
  },
  {
    id: '3',
    type: 'zoom',
    data: {
      content: 'zoom out even further',
      zoomLevel: 0.7
    },
    position: { x: 0, y: 200 }
  }
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true
  }
];
