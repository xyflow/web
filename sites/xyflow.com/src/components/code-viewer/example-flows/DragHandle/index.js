import React from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background } from 'reactflow';
import 'reactflow/dist/style.css';

import DragHandleNode from './DragHandleNode.js';

const nodeTypes = {
  dragHandleNode: DragHandleNode,
};

const initialNodes = [
  {
    id: '2',
    type: 'dragHandleNode',
    dragHandle: '.custom-drag-handle',
    style: { border: '1px solid #ddd', padding: '20px 40px' },
    position: { x: 200, y: 200 },
  },
];

const DragHandleFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
    >
      <Background />
    </ReactFlow>
  );
};

export default DragHandleFlow;
