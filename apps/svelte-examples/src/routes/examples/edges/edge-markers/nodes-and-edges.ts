import { MarkerType } from '@xyflow/svelte';
import type { Node, Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: 'A',
    position: { x: 20, y: 20 },
    data: { label: 'A' }
  },
  {
    id: 'B',
    position: { x: 100, y: 200 },
    data: { label: 'B' }
  },
  {
    id: 'C',
    position: { x: 300, y: 20 },
    data: { label: 'C' }
  },
  {
    id: 'D',
    position: { x: 300, y: 170 },
    data: { label: 'D' }
  },
  {
    id: 'E',
    position: { x: 250, y: 300 },
    data: { label: 'E' }
  },
  {
    id: 'F',
    position: { x: 250, y: 450 },
    data: { label: 'F' }
  },
  {
    id: 'G',
    position: { x: 20, y: 450 },
    data: { label: 'G' }
  }
];

export const initialEdges: Edge[] = [
  {
    id: 'A->B',
    source: 'A',
    target: 'B',
    markerEnd: {
      type: MarkerType.Arrow
    },
    label: 'default arrow'
  },
  {
    id: 'C->D',
    source: 'C',
    target: 'D',
    markerEnd: {
      type: MarkerType.ArrowClosed
    },
    label: 'default closed arrow'
  },
  {
    id: 'D->E',
    source: 'D',
    target: 'E',
    markerEnd: {
      type: MarkerType.ArrowClosed
    },
    markerStart: {
      type: MarkerType.ArrowClosed,
      orient: 'auto-start-reverse'
    },
    label: 'marker start and marker end'
  },
  {
    id: 'E->F',
    source: 'E',
    target: 'F',
    markerEnd: 'logo',
    label: 'custom marker'
  },
  {
    id: 'B->G',
    source: 'B',
    target: 'G',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#FF4000'
    },
    label: 'marker size and color',
    style: 'stroke-width: 2px; stroke: #FF4000'
  }
];
