import { ReactFlow, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { defaultNodes } from './nodes';
import { defaultEdges } from './edges';

const nodeColor = (node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A5';
    default:
      return '#ff0072';
  }
};

function Flow() {
  return (
    <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView>
      <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
    </ReactFlow>
  );
}

export default Flow;
