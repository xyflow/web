"use client";

import {
  Background,
  Handle,
  NodeProps,
  Position,
  ReactFlow,
  Node,
} from "@xyflow/react";
import { BaseNode } from "@/registry/components/base-node";

const defaultNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "customNode",
    data: {
      label: "Custom Node",
    },
  },
];

const nodeTypes = {
  customNode: CustomNode,
};

function CustomNode({ selected, data }: NodeProps<Node<{ label: string }>>) {
  return (
    <BaseNode selected={selected}>
      <>
        {data.label}
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </>
    </BaseNode>
  );
}

export default function Demo() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
