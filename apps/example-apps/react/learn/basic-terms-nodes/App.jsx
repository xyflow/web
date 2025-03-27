import React from 'react';
import { ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'This is a node' },
    style: { borderWidth: 1 },
  },
];

function Flow() {
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <ReactFlowProvider>
        <ReactFlow defaultNodes={initialNodes} fitView preventScrolling={false} />
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;
