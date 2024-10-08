import type { Node, Edge } from '@xyflow/svelte';

export const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { icon: 'function', title: 'readFile', subline: 'api.ts' },
    type: 'turbo'
  },
  {
    id: '2',
    position: { x: 250, y: 0 },
    data: { icon: 'function', title: 'bundle', subline: 'apiContents' },
    type: 'turbo'
  },
  {
    id: '3',
    position: { x: 0, y: 250 },
    data: { icon: 'function', title: 'readFile', subline: 'sdk.ts' },
    type: 'turbo'
  },
  {
    id: '4',
    position: { x: 250, y: 250 },
    data: { icon: 'function', title: 'bundle', subline: 'sdkContents' },
    type: 'turbo'
  },
  {
    id: '5',
    position: { x: 500, y: 125 },
    data: { icon: 'function', title: 'concat', subline: 'api, sdk' },
    type: 'turbo'
  },
  {
    id: '6',
    position: { x: 750, y: 125 },
    data: { icon: 'file', title: 'fullBundle' },
    type: 'turbo'
  }
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2'
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4'
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5'
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5'
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6'
  }
];
