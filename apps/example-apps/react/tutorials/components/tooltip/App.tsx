import { Position, ReactFlow, useNodesState, type Node } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { BaseNode, BaseNodeContent } from './components/base-node';
import {
  NodeTooltip,
  NodeTooltipContent,
  NodeTooltipTrigger,
} from './components/node-tooltip';

function Tooltip() {
  return (
    <NodeTooltip>
      <NodeTooltipContent position={Position.Top}>Hidden Content</NodeTooltipContent>
      <BaseNode>
        <BaseNodeContent>
          <NodeTooltipTrigger>Hover</NodeTooltipTrigger>
        </BaseNodeContent>
      </BaseNode>
    </NodeTooltip>
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
