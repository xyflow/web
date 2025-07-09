import { memo } from "react";
import { NodeProps } from "@xyflow/react";

import { BaseNode, BaseNodeContent } from "@/registry/components/base-node";

export const SimpleBaseNode = memo(({ data }: NodeProps) => {
  return (
    <BaseNode>
      <BaseNodeContent className="bg-red-100">{data.label}</BaseNodeContent>
    </BaseNode>
  );
});

SimpleBaseNode.displayName = "SimpleBaseNode";
