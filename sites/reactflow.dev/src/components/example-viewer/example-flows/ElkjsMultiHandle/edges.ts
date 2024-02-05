import { Edge } from 'reactflow';

export const edges: Edge[] = [
  {
    id: 'a-b',
    source: 'a',
    sourceHandle: 'a-s-a',
    target: 'b',
    targetHandle: 'b-t-a',
  },
  {
    id: 'a-c',
    source: 'a',
    sourceHandle: 'a-s-b',
    target: 'c',
    targetHandle: 'c-t-b',
  },
  {
    id: 'a-d',
    source: 'a',
    sourceHandle: 'a-s-c',
    target: 'd',
    targetHandle: 'd-t-c',
  },
  {
    id: 'b-e',
    source: 'b',
    sourceHandle: 'b-s-a',
    target: 'e',
    targetHandle: 'e-t-a',
  },
  {
    id: 'd-e',
    source: 'd',
    sourceHandle: 'd-s-b',
    target: 'e',
    targetHandle: 'e-t-b',
  },
  {
    id: 'e-f',
    source: 'e',
    sourceHandle: 'e-s-a',
    target: 'f',
    targetHandle: 'f-t-b',
  },
  {
    id: 'e-g',
    source: 'e',
    sourceHandle: 'e-s-a',
    target: 'g',
    targetHandle: 'g-t-a',
  },
];
