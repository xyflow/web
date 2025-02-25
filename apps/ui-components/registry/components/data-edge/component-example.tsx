import { Handle, NodeProps, Position, useReactFlow, Node } from "@xyflow/react";

import { memo } from "react";
import { BaseNode } from "@/registry/components/base-node";
import { Slider } from "@/components/ui/slider";

export type CounterNodeType = Node<{ value: number }>;

export const CounterNode = memo(({ id, data }: NodeProps<CounterNodeType>) => {
  const { updateNodeData } = useReactFlow();

  return (
    <BaseNode>
      <Slider
        value={[data.value]}
        min={0}
        max={100}
        step={1}
        className="nopan nodrag w-24"
        onValueChange={([value]) => {
          updateNodeData(id, (node) => ({
            ...node.data,
            value,
          }));
        }}
      />
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  );
});
