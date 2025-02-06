"use client";

import { Background, ReactFlow } from "@xyflow/react";
import WorkflowNodeDemo from "@/registry/components/workflow-node/demo";

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

export default function DemoPage() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
