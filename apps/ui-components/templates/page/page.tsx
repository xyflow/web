"use client";

import { Background, ReactFlow } from "@xyflow/react";

import $CAMELCOMPONENTDemo from "@/registry/components/$COMPONENT/demo";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: { label: "Node" },
  },
];

export default function DemoPage() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
