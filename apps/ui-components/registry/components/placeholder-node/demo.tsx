import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { PlaceholderNode } from "@/registry/components/placeholder-node";

const CustomNode = memo(({ selected }: NodeProps) => {
  return (
    <PlaceholderNode selected={selected}>
      <div>+</div>
    </PlaceholderNode>
  );
});

export default CustomNode;
