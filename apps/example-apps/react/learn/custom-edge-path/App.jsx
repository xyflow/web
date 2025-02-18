import { ReactFlow } from '@xyflow/react';
import StepEdge from './StepEdge';
import SineEdge from './SineEdge';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
  { id: 'b', position: { x: 200, y: 100 }, data: { label: 'Node B' } },
  { id: 'c', position: { x: 0, y: 200 }, data: { label: 'Node C' } },
  { id: 'd', position: { x: 200, y: 300 }, data: { label: 'Node D' } },
];

const initialEdges = [
  { id: 'a->b', type: 'step', source: 'a', target: 'b' },
  { id: 'c->d', type: 'sine', source: 'c', target: 'd' },
];

const edgeTypes = {
  step: StepEdge,
  sine: SineEdge,
};

function Flow() {
  return (
    <ReactFlow
      defaultNodes={initialNodes}
      defaultEdges={initialEdges}
      edgeTypes={edgeTypes}
      fitView
    />
  );
}

export default Flow;
