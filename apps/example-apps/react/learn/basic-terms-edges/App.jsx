import React from 'react';
import { ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
    style: { opacity: 0.5 },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '2',
    position: { x: 400, y: 100 },
    data: { label: 'Node 2' },
    style: { opacity: 0.5 },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: 'This is an edge',
    labelStyle: { fontSize: 20 },
    labelBgStyle: { fill: 'rgba(255,255,255,0.7)' },
    labelBgPadding: [20, 10],
    style: { stroke: '#222', strokeWidth: 2 },
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
        <ReactFlow
          defaultNodes={initialNodes}
          defaultEdges={initialEdges}
          preventScrolling={false}
          fitView
        />
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;
