"use client";

import { Background, ReactFlow } from "@xyflow/react";

import { DevTools } from "@/registry/components/devtools";

const defaultNodes = [
  {
    id: "1a",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2a",
    data: { label: "Node 2" },
    position: { x: 100, y: 120 },
  },
  {
    id: "3a",
    data: { label: "Node 3" },
    position: { x: 400, y: 120 },
  },
];

const defaultEdges = [
  { id: "e1-2", source: "1a", target: "2a" },
  { id: "e1-3", source: "1a", target: "3a" },
];

export default function DevtoolsDemo() {
  return (
    <div className="h-full w-full">
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        fitView
      >
        <Background />
        <DevTools />
      </ReactFlow>
    </div>
  );
}
