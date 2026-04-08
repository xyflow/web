import { MarkerType, type Node, type Edge } from '@xyflow/svelte';

import { type BuiltInNode } from '@xyflow/svelte';
import { type AnnotationNode } from './AnnotationNode.svelte';
import { type CircleNode } from './CircleNode.svelte';

export type AppNode = BuiltInNode | AnnotationNode | CircleNode;

export const initialNodes: Node[] = [
  {
    id: 'annotation-1',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      label: 'this is a "node"',
      arrowStyle: 'right: 0; bottom: 0; transform: translate(-30px,10px) rotate(-70deg);',
    },
    position: { x: -80, y: -50 },
  },
  {
    id: '1-1',
    type: 'input',
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
      label: 'this is a "handle"',
      arrowStyle:
        'left: 0; bottom: 0; transform: translate(0px, -25px) rotate(140deg) scale(-1, 1);',
    },
    position: { x: 230, y: 30 },
  },
  {
    id: 'annotation-3',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 2,
      label: 'this is an "edge"',
      arrowStyle:
        'right: 0; bottom: 0; transform: translate(-10px, -25px) rotate(190deg);',
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
      label: 'try dragging the handle',
      arrowStyle:
        'left: 0; bottom: 0; transform: translate(-15px, -25px) rotate(140deg) scale(-1, 1);',
    },
    position: { x: 450, y: 220 },
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
