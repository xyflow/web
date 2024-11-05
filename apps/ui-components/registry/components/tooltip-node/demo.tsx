"use client";

import { Background, Position, ReactFlow } from "@xyflow/react";
import {
  TooltipNode,
  type TooltipNodeType,
} from "@/registry/components/tooltip-node";

const nodeTypes = {
  tooltip: TooltipNode,
};

const defaultNodes: TooltipNodeType[] = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: {
      label: "Node with bottom tooltip",
      tooltip: {
        label: "I am a tooltip",
        position: Position.Bottom,
      },
    },
    type: "tooltip",
  },
  {
    id: "2",
    position: { x: 350, y: 380 },
    data: {
      label: "Node with top tooltip",
      tooltip: {
        label: "I am a tooltip",
        position: Position.Top,
      },
    },
    type: "tooltip",
  },
  {
    id: "3",
    position: { x: 0, y: 320 },
    data: {
      label: "Node with right tooltip",
      tooltip: {
        label: "I am a tooltip",
        position: Position.Right,
      },
    },
    type: "tooltip",
  },
];

const defaultEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
];

export default function TooltipNodeDemo() {
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
