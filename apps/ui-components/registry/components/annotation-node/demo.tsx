"use client";

import { Background, ReactFlow } from "@xyflow/react";
import { AnnotationNode } from "@/registry/components/annotation-node";

const nodeTypes = {
  annotationNode: AnnotationNode,
};

const defaultNodes = [
  {
    id: "1a",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
  },
  {
    id: "1b",
    position: { x: -150, y: -50 },
    parentId: "1a",
    data: {
      level: 1,
      label: "Annotate your flows any way you like.",
      arrowStyle: {
        right: 30,
        bottom: 0,
        transform: "rotate(-60deg)",
      },
      arrow: "⤹",
    },
    type: "annotationNode",
  },
  {
    id: "2a",
    data: { label: "Node 2" },
    position: { x: -100, y: 120 },
  },
  {
    id: "3a",
    data: { label: "Node 3" },
    position: { x: 100, y: 120 },
  },
  {
    id: "3b",
    position: { x: 100, y: -110 },
    parentId: "3a",
    data: {
      level: 2,
      label: "Connect annotations to nodes to adjust interactively.",
      arrowStyle: {
        left: 20,
        bottom: -25,
        transform: "rotate(-10deg) ",
      },
      arrow: "⤹",
    },
    type: "annotationNode",
  },
];

const defaultEdges = [
  { id: "e1-2", source: "1a", target: "2a" },
  { id: "e1-3", source: "1a", target: "3a" },
];

export default function AnnotationNodeDemo() {
  return (
    <div className="h-full w-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
