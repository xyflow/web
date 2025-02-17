"use client";

import { Background, ReactFlow } from "@xyflow/react";

// Update this route with the path to your component
import SourceHandleDemo from "@/demo/source-handle";

const defaultNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Node" },
    type: "sourceHandleDemo",
  },
];

const nodeTypes = {
  sourceHandleDemo: SourceHandleDemo,
};

export default function DemoPage() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
