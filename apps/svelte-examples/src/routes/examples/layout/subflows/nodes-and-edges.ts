import type { Node, Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 0' },
    position: { x: 250, y: 5 },
    class: 'light'
  },
  {
    id: '2',
    data: { label: 'Group A' },
    position: { x: 100, y: 100 },
    class: 'light',
    style: 'background-color: rgba(255, 0, 0, 0.2); width: 200px; height: 200px;'
  },
  {
    id: '2a',
    data: { label: 'Node A.1' },
    position: { x: 10, y: 50 },
    parentNode: '2'
  },
  { id: '3', data: { label: 'Node 1' }, position: { x: 320, y: 100 }, class: 'light' },
  {
    id: '4',
    data: { label: 'Group B' },
    position: { x: 320, y: 200 },
    class: 'light',
    style: 'background-color: rgba(255, 0, 0, 0.2); width: 300px; height: 300px;',
    type: 'group'
  },
  {
    id: '4a',
    data: { label: 'Node B.1' },
    position: { x: 15, y: 65 },
    class: 'light',
    parentNode: '4',
    extent: 'parent'
  },
  {
    id: '4b',
    data: { label: 'Group B.A' },
    position: { x: 15, y: 120 },
    class: 'light',
    style: 'background-color: rgba(255, 0, 255, 0.2); width: 270px; height: 150px;',
    parentNode: '4'
  },
  {
    id: '4b1',
    data: { label: 'Node B.A.1' },
    position: { x: 20, y: 40 },
    class: 'light',
    parentNode: '4b'
  },
  {
    id: '4b2',
    data: { label: 'Node B.A.2' },
    position: { x: 100, y: 100 },
    class: 'light',
    parentNode: '4b'
  }
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2a-4a', source: '2a', target: '4a' },
  { id: 'e3-4b', source: '3', target: '4b' },
  { id: 'e4a-4b1', source: '4a', target: '4b1' },
  { id: 'e4a-4b2', source: '4a', target: '4b2' },
  { id: 'e4b1-4b2', source: '4b1', target: '4b2' }
];
