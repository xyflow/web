"use client";

import { Background, ReactFlow } from "@xyflow/react";

import NodeHeaderDemoNode from "./component-example";

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

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
