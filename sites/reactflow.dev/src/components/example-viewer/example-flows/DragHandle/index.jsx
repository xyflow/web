import React from 'react';
import ReactFlow, { useNodesState, useEdgesState, Background } from 'reactflow';
import 'reactflow/dist/style.css';

import DragHandleNode from './DragHandleNode';

const nodeTypes = {
  dragHandleNode: DragHandleNode,
};

const initialNodes = [
  {
    id: '2',
    type: 'dragHandleNode',

    // Specify the custom class acting as a drag handle
    dragHandle: '.custom-drag-handle',

    style: {
      border: '1px solid #ddd',
      padding: '20px 40px',
      background: 'white',
    },
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
      fitView
    >
      <Background />
    </ReactFlow>
  );
};

export default DragHandleFlow;
