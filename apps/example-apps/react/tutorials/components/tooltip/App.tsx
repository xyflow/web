import React from 'react';
import { ReactFlow, type Node, Position, useNodesState } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { TooltipNode, TooltipContent, TooltipTrigger } from './components/tooltip-node';
import { BaseNodeContent } from './components/base-node';

function Tooltip() {
  return (
    <TooltipNode>
      <TooltipContent position={Position.Top}>Hidden Content</TooltipContent>
      <BaseNodeContent>
        <TooltipTrigger>Hover</TooltipTrigger>
      </BaseNodeContent>
    </TooltipNode>
  );
}

const nodeTypes = {
  tooltip: Tooltip,
};

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: {},
    type: 'tooltip',
  },
];

function Flow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);

  return (
    <div className="h-screen w-screen p-8 bg-gray-50 rounded-xl">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        fitView
      />
    </div>
  );
}
export function App() {
  return <Flow />;
}
