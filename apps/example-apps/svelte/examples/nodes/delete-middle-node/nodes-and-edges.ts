import type { Node, Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Start here...' }, position: { x: -150, y: 0 } },
  { id: '2', type: 'input', data: { label: '...or here!' }, position: { x: 150, y: 0 } },
  { id: '3', data: { label: 'Delete me.' }, position: { x: 0, y: 100 } },
  { id: '4', data: { label: 'Then me!' }, position: { x: 0, y: 200 } },
  { id: '5', type: 'output', data: { label: 'End here!' }, position: { x: 0, y: 300 } }
];

export const initialEdges: Edge[] = [
  { id: '1->3', source: '1', target: '3' },
  { id: '2->3', source: '2', target: '3' },
  { id: '3->4', source: '3', target: '4' },
  { id: '4->5', source: '4', target: '5' }
];
