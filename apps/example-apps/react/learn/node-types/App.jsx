import { ReactFlow } from '@xyflow/react';

const defaultNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 0, y: 0 },
  },

  {
    id: '2',
    data: { label: 'Default Node' },
    position: { x: 0, y: 100 },
    // when you don't pass a type, the default one gets used
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 0, y: 200 },
  },
  {
    id: '4',
    type: 'group',
    data: null,
    position: { x: 0, y: 300 },
  },
];

const defaultEdges = [];

function Flow() {
  return (
    <ReactFlow
      defaultNodes={defaultNodes}
      defaultEdges={defaultEdges}
      fitView
    />
  );
}

export default Flow;
