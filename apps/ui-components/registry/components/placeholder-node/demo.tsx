import { memo } from "react";
import { NodeProps } from "@xyflow/react";
import { PlaceholderNode } from "@/registry/components/placeholder-node";

const PlaceholderNodeDemo = memo(({ selected }: NodeProps) => {
  return (
    <PlaceholderNode selected={selected}>
      <div>+</div>
    </PlaceholderNode>
  );
});

export default PlaceholderNodeDemo;
