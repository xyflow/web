"use client";

import { Handle, Node, NodeProps, Position, useReactFlow } from "@xyflow/react";

import { useCallback, memo } from "react";
import { BaseNode } from "@/registry/components/base-node";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export type CounterNodeType = Node<{ value: number }>;

export const CounterNode = memo(({ id, data }: NodeProps<CounterNodeType>) {
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
});
