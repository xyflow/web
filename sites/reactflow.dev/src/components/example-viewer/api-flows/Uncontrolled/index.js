import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import defaultNodes from './nodes.js';
import defaultEdges from './edges.js';

const edgeOptions = {
  animated: true,
  style: {
    stroke: 'white',
  },
};

const connectionLineStyle = { stroke: 'white' };

export default function Flow() {
  return (
    <ReactFlow
      defaultNodes={defaultNodes}
      defaultEdges={defaultEdges}
      defaultEdgeOptions={edgeOptions}
      fitView
      style={{
        backgroundColor: '#D3D2E5',
      }}
      connectionLineStyle={connectionLineStyle}
    />
  );
}
