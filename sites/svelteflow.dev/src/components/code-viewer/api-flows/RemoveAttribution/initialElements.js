const nodeStyle = {
  color: '#0041d0',
  borderColor: '#0041d0',
};

export const nodes = [
  {
    type: 'input',
    id: '1',
    data: { label: 'Thanks' },
    position: { x: 100, y: 0 },
    style: nodeStyle,
  },
  {
    id: '2',
    data: { label: 'for' },
    position: { x: 0, y: 100 },
    style: nodeStyle,
  },
  {
    id: '3',
    data: { label: 'using' },
    position: { x: 200, y: 100 },
    style: nodeStyle,
  },
  {
    id: '4',
    data: { label: 'React Flow Pro!' },
    position: { x: 100, y: 200 },
    style: nodeStyle,
  },
];

export const edges = [
  {
    id: '1->2',
    source: '1',
    target: '2',
    animated: true,
  },
  {
    id: '1->3',
    source: '1',
    target: '3',
    animated: true,
  },
  {
    id: '2->4',
    source: '2',
    target: '4',
    animated: true,
  },
  {
    id: '3->4',
    source: '3',
    target: '4',
    animated: true,
  },
];
