"use client";

import { Background, ReactFlow } from "@xyflow/react";
import DemoWrapper from "@/components/demo-wrapper";
import TooltipNodeDemo from "@/registry/components/tooltip-node/demo";

const nodeTypes = {
  tooltipNode: TooltipNodeDemo,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: {},
    type: "tooltipNode",
  },
];

export default function DemoPage() {
  return (
    <DemoWrapper>
      <div className="h-full w-full">
        <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
          <Background />
        </ReactFlow>
      </div>
    </DemoWrapper>
  );
}
