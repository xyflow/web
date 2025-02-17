"use client";

import { Background, ReactFlow } from "@xyflow/react";

import {
  CounterNode,
  type CounterNodeType,
} from "@/registry/components/data-edge/demo";
import { DataEdge } from "@/registry/components/data-edge/";

const defaultNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    type: "counterNode",
    data: { value: 10 },
  },
  {
    id: "2",
    position: { x: 300, y: 300 },
    data: { label: "Output" },
  },
];

const nodeTypes = {
  counterNode: CounterNode,
};

const defaultEdges = [
  {
    id: "1->2",
    source: "1",
    target: "2",
    type: "dataEdge",
    data: { key: "value" },
  } satisfies DataEdge<CounterNodeType>,
];

const edgeTypes = {
  dataEdge: DataEdge,
};

export default function DemoPage() {
  return (
    <div className="h-full w-full">
      <ReactFlow
        defaultNodes={defaultNodes}
        nodeTypes={nodeTypes}
        defaultEdges={defaultEdges}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
