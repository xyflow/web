"use client";

import { Background, ReactFlow, Node } from "@xyflow/react";
import { LabeledGroupNode } from "@/registry/components/labeled-group-node";

const nodeTypes = {
  labeledGroupNode: LabeledGroupNode,
};


const defaultNodes: Node[] = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: { label: "Group Node" },
    width: 380,
    height: 200,
    type: "labeledGroupNode"
  },
  {
    id: "2",
    position: { x: 50, y: 100 },
    data: { label: "Node" },
    type: "default",
    parentId: "1",
    extent: "parent"
  },
  {
    id: "3",
    position: { x: 200, y: 50 },
    data: { label: "Node" },
    type: "default",
    parentId: "1",
    extent: "parent"
  },
];

export default function LabeledGroupNodeDemo() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
