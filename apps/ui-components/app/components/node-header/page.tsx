"use client";

import { Background, ReactFlow } from "@xyflow/react";

// Update this route with the path to your component
import NodeHeaderDemoNode from "@/demo/node-header";

const nodeTypes = {
  nodeHeaderNode: NodeHeaderDemoNode,
};

const defaultNodes = [
  {
    id: "1",
    type: "nodeHeaderNode",
    position: { x: 200, y: 200 },
    data: {},
  },
];

export default function DemoPage() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
