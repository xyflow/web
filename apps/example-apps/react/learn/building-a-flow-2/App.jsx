import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: 'n1',
    data: { label: 'Node 1' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: 'n2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
  },
];

function Flow() {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow nodes={initialNodes} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
