"use client";

import { Background, Node, NodeProps, ReactFlow } from "@xyflow/react";

import { BaseNode } from "@/registry/components/base-node";
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderActions,
  NodeHeaderDeleteAction,
  NodeHeaderMenuAction,
  NodeHeaderIcon,
} from "@/registry/components/node-header";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

function NodeHeaderDemoNode({
  data,
}: NodeProps<Node<{ title: string; label: string }>>) {
  return (
    <BaseNode>
      <NodeHeader className="bg-pink-300 text-pink-900">
        <NodeHeaderIcon>
          <Languages />
        </NodeHeaderIcon>
        <NodeHeaderTitle>{data.title}</NodeHeaderTitle>
        <NodeHeaderActions>
          <NodeHeaderMenuAction label="Expand account options">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </NodeHeaderMenuAction>
          <NodeHeaderDeleteAction label="Delete node" />
        </NodeHeaderActions>
      </NodeHeader>

      <div className="flex h-32 w-64 items-center justify-center rounded bg-pink-500 text-sm text-white">
        Some actual node content here.
      </div>
    </BaseNode>
  );
}

const nodeTypes = {
  demo: NodeHeaderDemoNode,
};

const defaultNodes = [
  {
    id: "1",
    type: "demo",
    position: { x: 200, y: 200 },
    data: {
      title: "Detect language",
      label: "Node",
    },
  },
];

export default function NodeHeaderDemo() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
