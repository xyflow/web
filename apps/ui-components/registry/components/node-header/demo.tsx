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
import { Rocket, Trash } from "lucide-react";
import { useCallback } from "react";

function NodeHeaderDemoNode({
  data,
}: NodeProps<Node<{ title: string; label: string }>>) {
  return (
    <BaseNode className="px-3 py-2">
      <NodeHeader className="-mx-3 -mt-2 border-b">
        <NodeHeaderIcon>
          <Rocket />
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

      <div className="text-sm">{data.label}</div>
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
      title: "Node Header",
      label: "This is the content of the node.",
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
