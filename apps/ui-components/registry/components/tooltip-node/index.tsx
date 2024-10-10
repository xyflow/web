import { useState } from "react";
import { Node, NodeProps, NodeToolbar } from "@xyflow/react";
import { BaseNode } from "@/registry/components/base-node";

type TooltipNode = Node<{
  label: string;
  tooltip: string;
}>;

export function TooltipNode({ data, selected }: NodeProps<TooltipNode>) {
  const [isTooltipVisisble, setTooltipVisible] = useState(false);

  return (
    <BaseNode
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      selected={selected}
    >
      <NodeToolbar
        isVisible={isTooltipVisisble || selected}
        className="rounded-sm bg-primary p-2 text-primary-foreground"
      >
        {data.tooltip}
      </NodeToolbar>
      <div>{data.label}</div>
    </BaseNode>
  );
}
