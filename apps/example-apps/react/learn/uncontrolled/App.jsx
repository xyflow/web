import { ReactFlow } from '@xyflow/react';

import { defaultNodes } from './nodes';
import { defaultEdges } from './edges';

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
