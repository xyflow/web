import { useState } from "react";
import {
  Node,
  NodeProps,
  NodeToolbar,
  NodeToolbarProps,
  Handle,
  Position,
} from "@xyflow/react";
import { BaseNode } from "@/registry/components/base-node";

export type TooltipNodeType = Node<{
  label: string;
  tooltip?: {
    label: string;
    position?: NodeToolbarProps["position"];
  };
}>;

export function TooltipNode({ data, selected }: NodeProps<TooltipNodeType>) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleFocus = () => setTooltipVisible(true);

  const handleBlur = () => setTooltipVisible(false);

  return (
    <BaseNode
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      selected={selected}
      tabIndex={0}
    >
      <NodeToolbar
        isVisible={isTooltipVisible || selected}
        className="rounded-sm bg-primary p-2 text-primary-foreground"
        position={data.tooltip?.position}
        tabIndex={1}
      >
        {data.tooltip?.label}
      </NodeToolbar>
      <div>{data.label}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </BaseNode>
  );
}
