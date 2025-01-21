"use client";

import {
  Background,
  Handle,
  Node,
  NodeProps,
  Position,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";

import { useCallback } from "react";
import { DataEdge } from "@/registry/components/data-edge";
import { BaseNode } from "@/registry/components/base-node";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

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
  } satisfies DataEdge<CounterNode>,
];

const edgeTypes = {
  dataEdge: DataEdge,
};

export default function DataEdgeDemo() {
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

type CounterNode = Node<{ value: number }>;

function CounterNode({ id, data }: NodeProps<CounterNode>) {
  const { updateNodeData } = useReactFlow();
  const handleIncr = useCallback(() => {
    updateNodeData(id, ({ data }) => {
      if ("value" in data && typeof data.value === "number") {
        return { ...data, value: data.value + 1 };
      }

      return data;
    });
  }, [id, updateNodeData]);
  const handleDecr = useCallback(() => {
    updateNodeData(id, ({ data }) => {
      if ("value" in data && typeof data.value === "number") {
        return { ...data, value: data.value - 1 };
      }

      return data;
    });
  }, [id, updateNodeData]);

  return (
    <BaseNode className="flex items-center gap-4">
      <Button onClick={handleDecr} className="nopan nodrag size-6 p-1">
        <Minus />
      </Button>
      <pre>{String(data.value).padStart(2, " ")}</pre>
      <Button onClick={handleIncr} className="nopan nodrag size-6 p-1">
        <Plus />
      </Button>
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  );
}
