import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
} from '@xyflow/react';

import ResizableNode from './ResizableNode';
import ResizableNodeSelected from './ResizableNodeSelected';
import CustomResizerNode from './CustomResizerNode';

import '@xyflow/react/dist/style.css';

const nodeTypes = {
  ResizableNode,
  ResizableNodeSelected,
  CustomResizerNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'ResizableNode',
    data: { label: 'NodeResizer' },
    position: { x: 0, y: 50 },
  },
  {
    id: '2',
    type: 'ResizableNodeSelected',
    data: { label: 'NodeResizer when selected' },
    position: { x: -100, y: 150 },
  },
  {
    id: '3',
    type: 'CustomResizerNode',
    data: { label: 'Custom Resize Icon' },
    position: { x: 150, y: 150 },
    style: {
      height: 100,
    },
  },
];

const initialEdges = [];

export default function NodeToolbarExample() {
  return (
    <ReactFlow
      defaultNodes={initialNodes}
      defaultEdges={initialEdges}
      minZoom={0.2}
      maxZoom={4}
      fitView
      nodeTypes={nodeTypes}
      fitViewOptions={{ padding: 0.5 }}
    >
      <Background variant={BackgroundVariant.Dots} />
      <Controls />
    </ReactFlow>
  );
}
