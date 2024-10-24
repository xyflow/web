"use client";

import {
  Background,
  Handle,
  NodeProps,
  Position,
  ReactFlow,
} from "@xyflow/react";
import { PlaceholderNode } from "@/registry/components/placeholder-node"; 

const defaultNodes = [
  {
    id: '1',
    data: { label: 'Original Node' },
    position: { x: 0, y: 0 },
    type: 'default',
  },
  {
    id: '2',
    data: { label: '+' }, 
    position: { x: 0, y: 150 },
    type: 'placeholder',
  },
];

const defaultEdges = [
  {
    id: '1=>2',
    source: '1',
    target: '2',
    type: 'default',
    animated: true,
  },
];

const nodeTypes = {
  placeholder: CustomNode, 
};

type CustomNodeProps = NodeProps & {
  data: {
    label: string;
  };
};


function CustomNode({ id, data, selected }: CustomNodeProps) {
  return (
    <PlaceholderNode 
      id={id}
      selected={selected} 
    >
      {data.label}
      <Handle
        type="target"
        style={{ visibility: 'hidden' }}
        position={Position.Top}
        isConnectable={false}
      />
      <Handle
        type="source"
        style={{ visibility: 'hidden' }}
        position={Position.Bottom}
        isConnectable={false}
      />
    </PlaceholderNode>
  );
}


export default function Demo() {
  return (
    <div className="h-full w-full">
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
