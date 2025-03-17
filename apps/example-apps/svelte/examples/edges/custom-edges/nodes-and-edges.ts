import { type Node, type Edge, Position, MarkerType } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: 'button-1',
    type: 'input',
    data: { label: 'Button Edge 1' },
    position: { x: 125, y: 0 },
  },
  {
    id: 'button-2',
    data: { label: 'Button Edge 2' },
    position: { x: 125, y: 200 },
  },
  {
    id: 'bi-1',
    data: { label: 'Bi Directional 1' },
    position: { x: 0, y: 300 },
    type: 'biDirectional',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'bi-2',
    data: { label: 'Bi Directional 2' },
    position: { x: 250, y: 300 },
    type: 'biDirectional',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'self-1',
    data: { label: 'Self Connecting' },
    position: { x: 125, y: 500 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'edge-button',
    source: 'button-1',
    target: 'button-2',
    type: 'buttonEdge',
  },
  {
    id: 'edge-bi-1',
    source: 'bi-1',
    target: 'bi-2',
    type: 'biDirectional',
    sourceHandle: 'right',
    targetHandle: 'left',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge-bi-2',
    source: 'bi-2',
    target: 'bi-1',
    type: 'biDirectional',
    sourceHandle: 'left',
    targetHandle: 'right',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'edge-self',
    source: 'self-1',
    target: 'self-1',
    type: 'selfConnecting',
    markerEnd: { type: MarkerType.Arrow },
  },
];
