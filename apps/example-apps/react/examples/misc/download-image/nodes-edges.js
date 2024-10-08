export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: '▲' },
    position: { x: 0, y: 50 },
    sourcePosition: 'right',
    style: {
      backgroundColor: '#BEE3F8',
    },
  },
  {
    id: '2',
    type: 'custom',
    data: {},
    position: { x: 200, y: 50 },
    style: {
      backgroundColor: '#90CDF4',
    },
  },
  {
    id: '3',
    data: { label: '▲' },
    position: { x: 400, y: 0 },
    targetPosition: 'left',
    sourcePosition: 'right',
    style: {
      backgroundColor: '#63B3ED',
    },
  },
  {
    id: '4',
    data: { label: '▲' },
    position: { x: 400, y: 100 },
    targetPosition: 'left',
    sourcePosition: 'right',
    style: {
      backgroundColor: '#63B3ED',
    },
  },
  {
    id: '5',
    type: 'output',
    data: { label: '▲' },
    position: { x: 600, y: 0 },
    targetPosition: 'left',
    style: {
      backgroundColor: '#4299E1',
    },
  },
  {
    id: '6',
    type: 'output',
    data: { label: '▲' },
    position: { x: 600, y: 100 },
    targetPosition: 'left',
    style: {
      backgroundColor: '#4299E1',
    },
  },
];

export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e2a-3',
    source: '2',
    target: '3',
    sourceHandle: 'a',
  },
  {
    id: 'e2b-4',
    source: '2',
    target: '4',
    sourceHandle: 'b',
  },
  {
    id: 'e3a-5',
    source: '3',
    target: '5',
  },
  {
    id: 'e4b-6',
    source: '4',
    target: '6',
  },
];
