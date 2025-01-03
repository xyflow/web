"use client";

import {
  Background,
  Node,
  NodeProps,
  ReactFlow,
  useNodeId,
  useReactFlow,
} from "@xyflow/react";

import { BaseNode } from "@/registry/components/base-node";
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderActions,
  NodeHeaderMenuAction,
  NodeHeaderIcon,
  NodeHeaderAction,
} from "@/registry/components/node-header";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Languages, Trash } from "lucide-react";
import { useCallback } from "react";

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
          <NodeHeaderDeleteAction />
        </NodeHeaderActions>
      </NodeHeader>

      <div className="flex h-32 w-64 items-center justify-center rounded bg-pink-500 text-sm text-white">
        Some actual node content here.
      </div>
    </BaseNode>
  );
}

const NodeHeaderDeleteAction = () => {
  const id = useNodeId();
  const { setNodes } = useReactFlow();

  const handleClick = useCallback(() => {
    setNodes((prevNodes) =>
      prevNodes.filter((node) => {
        if (node.id === id) {
          window.setTimeout(() => {
            setNodes((prevNodes) => [...prevNodes, node]);
          }, 2000);

          return false;
        }

        return true;
      }),
    );
  }, []);

  return (
    <NodeHeaderAction onClick={handleClick} variant="ghost" label="Delete node">
      <Trash />
    </NodeHeaderAction>
  );
};

NodeHeaderDeleteAction.displayName = "NodeHeaderDeleteAction";

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
