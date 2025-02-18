"use client";

import { Background, ReactFlow } from "@xyflow/react";

import ButtonHandleDemo from "@/registry/components/button-handle/demo";

const defaultNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Node" },
    type: "ButtonHandleDemo",
  },
];

const nodeTypes = {
  ButtonHandleDemo,
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
