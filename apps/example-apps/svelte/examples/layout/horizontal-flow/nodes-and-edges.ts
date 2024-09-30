import { Position, type Node, type Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: 'horizontal-1',
    sourcePosition: Position.Right,
    type: 'input',
    data: { label: 'Input' },
    position: { x: 0, y: 80 }
  },
  {
    id: 'horizontal-2',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: 'A Node' },
    position: { x: 250, y: 0 }
  },
  {
    id: 'horizontal-3',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: 'Node 3' },
    position: { x: 250, y: 160 }
  },
  {
    id: 'horizontal-4',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: 'Node 4' },
    position: { x: 500, y: 0 }
  },
  {
    id: 'horizontal-5',
    sourcePosition: Position.Top,
    targetPosition: Position.Bottom,
    data: { label: 'Node 5' },
    position: { x: 500, y: 100 }
  },
  {
    id: 'horizontal-6',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: 'Node 6' },
    position: { x: 500, y: 230 }
  },
  {
    id: 'horizontal-7',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: 'Node 7' },
    position: { x: 750, y: 50 }
  },
  {
    id: 'horizontal-8',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: 'Node 8' },
    position: { x: 750, y: 300 }
  }
];

export const initialEdges: Edge[] = [
  {
    id: 'horizontal-e1-2',
    source: 'horizontal-1',
    type: 'smoothstep',
    target: 'horizontal-2',
    animated: true
  },
  {
    id: 'horizontal-e1-3',
    source: 'horizontal-1',
    type: 'smoothstep',
    target: 'horizontal-3',
    animated: true
  },
  {
    id: 'horizontal-e1-4',
    source: 'horizontal-2',
    type: 'smoothstep',
    target: 'horizontal-4',
    label: 'edge label'
  },
  {
    id: 'horizontal-e3-5',
    source: 'horizontal-3',
    type: 'smoothstep',
    target: 'horizontal-5',
    animated: true
  },
  {
    id: 'horizontal-e3-6',
    source: 'horizontal-3',
    type: 'smoothstep',
    target: 'horizontal-6',
    animated: true
  },
  {
    id: 'horizontal-e5-7',
    source: 'horizontal-5',
    type: 'smoothstep',
    target: 'horizontal-7',
    animated: true
  },
  {
    id: 'horizontal-e6-8',
    source: 'horizontal-6',
    type: 'smoothstep',
    target: 'horizontal-8',
    animated: true
  }
];
