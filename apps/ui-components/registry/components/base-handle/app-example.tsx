"use client";

import { Background, ReactFlow } from "@xyflow/react";

import BaseHandle from "./component-example";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: {},
    type: "baseHandle",
  },
];

const nodeTypes = {
  baseHandle: BaseHandle,
};

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
