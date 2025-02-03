"use client";

import { Background, ReactFlow } from "@xyflow/react";

import NodeHeaderDemoNode from "@/registry/components/node-header/demo";

const nodeTypes = {
  demo: NodeHeaderDemoNode,
};

const defaultNodes = [
  {
    id: "1",
    type: "demo",
    position: { x: 200, y: 200 },
    data: {},
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
