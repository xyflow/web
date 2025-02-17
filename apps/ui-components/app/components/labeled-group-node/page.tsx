"use client";

import { Background, ReactFlow, Node } from "@xyflow/react";

// Update this route with the path to your component
import LabeledGroupNodeDemo from "@/demo/labeled-group-node";

const nodeTypes = {
  labeledGroupNode: LabeledGroupNodeDemo,
};

const defaultNodes: Node[] = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: { label: "Group Node" },
    width: 380,
    height: 200,
    type: "labeledGroupNode",
  },
  {
    id: "2",
    position: { x: 50, y: 100 },
    data: { label: "Node" },
    type: "default",
    parentId: "1",
    extent: "parent",
  },
  {
    id: "3",
    position: { x: 200, y: 50 },
    data: { label: "Node" },
    type: "default",
    parentId: "1",
    extent: "parent",
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
