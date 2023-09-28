import React from 'react';
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'This is a node' },
    style: { borderWidth: 2 },
  },
];

function Flow() {
  return (
    <div style={{ height: 250, background: '#FAF5FF', border: '1px solid #333', marginBottom: 20 }}>
      <ReactFlowProvider>
        <ReactFlow defaultNodes={initialNodes} fitView preventScrolling={false} />
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;
