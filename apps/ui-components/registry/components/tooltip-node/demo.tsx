"use client";

import { Background, ReactFlow } from "@xyflow/react";
import { TooltipNode } from "@/registry/components/tooltip-node";

const nodeTypes = {
  tooltip: TooltipNode,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: {
      label: "Hover me to see the tooltip!",
      tooltip: "This is a tooltip",
    },
    type: "tooltip",
  },
];

export default function TooltipNodeDemo() {
  return (
    <div className="h-full w-full">
      <ReactFlow nodeTypes={nodeTypes} defaultNodes={defaultNodes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
