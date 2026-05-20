import { MarkerType, type Node, type Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: 'annotation-1',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      label: 'This is a "node"',
      arrowStyle: 'arrow-bottom-right',
    },
    position: { x: -65, y: -50 },
  },
  {
    id: '1-1',
    type: 'default',
    data: {
      label: 'node label',
    },
    position: { x: 150, y: 0 },
  },
  {
    id: 'annotation-2',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      label: 'This is a "handle"',
      arrowStyle: 'arrow-top-left',
    },
    position: { x: 235, y: 35 },
  },
  {
    id: 'annotation-3',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 2,
      label: 'This is an "edge"',
      arrowStyle: 'arrow-top-right',
    },
    position: { x: 20, y: 120 },
  },
  {
    id: '1-2',
    type: 'default',
    data: {
      label: 'node label',
    },
    position: { x: 350, y: 200 },
  },
  {
    id: 'annotation-4',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      label: 'Try dragging the handle',
      arrowStyle: 'arrow-top-left',
    },
    position: { x: 430, y: 240 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1-1',
    target: '1-2',
    label: 'edge label',
    type: 'smoothstep',
  },
  {
    id: 'e2-2',
    source: '1-2',
    target: '2-2',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
