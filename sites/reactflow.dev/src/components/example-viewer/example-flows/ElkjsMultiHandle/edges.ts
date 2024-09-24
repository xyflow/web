import { type Edge } from '@xyflow/react';

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
    sourceHandle: 'a-s-c',
    target: 'c',
    targetHandle: 'c-t-c',
  },
  {
    id: 'a-d',
    source: 'a',
    sourceHandle: 'a-s-b',
    target: 'd',
    targetHandle: 'd-t-b',
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
    sourceHandle: 'd-s-a',
    target: 'e',
    targetHandle: 'e-t-a',
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
