"use client";

import { Background, ReactFlow } from "@xyflow/react";
import DemoWrapper from "@/components/demo-wrapper";
import Demo from "@/registry/components/labeled-handle/demo";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: {},
    type: "customNode",
  },
];

const nodeTypes = {
  customNode: Demo,
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
