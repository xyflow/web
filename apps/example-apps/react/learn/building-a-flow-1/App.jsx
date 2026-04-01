import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function Flow() {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow colorMode="system">
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
