import { Position } from 'reactflow';

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  style: {
    borderRadius: '100%',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: {
      label: '⬛️',
    },
    ...nodeDefaults,
  },
  {
    id: '2',
    position: { x: 250, y: -100 },
    data: {
      label: '🟩',
    },
    ...nodeDefaults,
  },
  {
    id: '3',
    position: { x: 250, y: 100 },
    data: {
      label: '🟧',
    },
    ...nodeDefaults,
  },
  {
    id: '4',
    position: { x: 500, y: 0 },
    data: {
      label: '🟦',
    },
    ...nodeDefaults,
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
  },
];

export { initialEdges, initialNodes };
