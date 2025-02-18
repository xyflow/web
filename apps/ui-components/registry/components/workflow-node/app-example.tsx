"use client";

import { Background, ReactFlow } from "@xyflow/react";
import WorkflowNodeDemo from "./component-example";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: { label: "Node" },
    type: "workflowNode",
  },
];

const nodeTypes = {
  workflowNode: WorkflowNodeDemo,
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
