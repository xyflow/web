import React from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
} from '@xyflow/react';

import DragHandleNode from './DragHandleNode';

const nodeTypes = {
  dragHandleNode: DragHandleNode,
};

const initialNodes = [
  {
    id: '2',
    type: 'dragHandleNode',

    // Specify the custom class acting as a drag handle
    dragHandle: '.drag-handle__custom',
    position: { x: 200, y: 200 },
  },
];

const DragHandleFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <ReactFlow
      style={{ backgroundColor: "#F7F9FB" }}
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
