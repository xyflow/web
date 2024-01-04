import React from 'react';
import { ReactFlow, Controls, Panel } from '@xyflow/react';

// we need to import the React Flow styles to make it work
import '@xyflow/react/dist/style.css';

function Flow() {
  return (
    <ReactFlow>
      <Controls showInteractive={false} />
      <Panel position="top-left">React Flow Mind Map</Panel>
    </ReactFlow>
  );
}

export default Flow;
