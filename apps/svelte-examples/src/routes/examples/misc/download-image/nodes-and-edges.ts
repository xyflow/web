import { type Node, type Edge, Position } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: '▲' },
    position: { x: 0, y: 50 },
    style: 'background: #BEE3F8;',
    sourcePosition: Position.Right
  },
  {
    id: '2',
    // type: 'custom',
    data: { label: '▲' },
    position: { x: 200, y: 50 },
    style: 'background: #90CDF4;',
    sourcePosition: Position.Right,
    targetPosition: Position.Left
  },
  {
    id: '3',
    data: { label: '▲' },
    position: { x: 400, y: 0 },
    style: 'background: #63B3ED;',
    sourcePosition: Position.Right,
    targetPosition: Position.Left
  },
  {
    id: '4',
    data: { label: '▲' },
    position: { x: 400, y: 100 },
    style: 'background: #63B3ED;',
    sourcePosition: Position.Right,
    targetPosition: Position.Left
  },
  {
    id: '5',
    type: 'output',
    data: { label: '▲' },
    position: { x: 600, y: 0 },
    style: 'background: #4299E1;',
    targetPosition: Position.Left
  },
  {
    id: '6',
    type: 'output',
    data: { label: '▲' },
    position: { x: 600, y: 100 },
    style: 'background: #4299E1;',
    targetPosition: Position.Left
  }
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2'
  },
  {
    id: 'e2a-3',
    source: '2',
    target: '3',
    sourceHandle: 'a'
  },
  {
    id: 'e2b-4',
    source: '2',
    target: '4',
    sourceHandle: 'b'
  },
  {
    id: 'e3a-5',
    source: '3',
    target: '5'
  },
  {
    id: 'e4b-6',
    source: '4',
    target: '6'
  }
];
