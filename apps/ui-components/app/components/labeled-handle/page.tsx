"use client";

import { Background, ReactFlow } from "@xyflow/react";
import DemoWrapper from "@/components/demo-wrapper";

// Update this route with the path to your component
import LabeledHandleDemo from "@/demo/labeled-handle";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: {},
    type: "labeledHandle",
  },
];

const nodeTypes = {
  labeledHandle: LabeledHandleDemo,
};

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
