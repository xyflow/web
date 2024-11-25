"use client";

import { Background, ReactFlow } from "@xyflow/react";
import { EdgeDropdownMenu } from "@/registry/components/edge-dropdown-menu";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: { label: "Node" },
  },
  {
    id: "2",
    position: { x: 500, y: 500 },
    data: { label: "Node" },
  },
];

const defaultEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "edgeDropdownMenu",
  },
];

const edgeTypes = {
  edgeDropdownMenu: EdgeDropdownMenu,
};

export default function Demo() {
  return (
    <div className="h-full w-full">
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
