import { memo } from "react";

import { BaseNode, BaseNodeContent } from "@/registry/components/base-node";

export const SimpleBaseNode = memo(() => {
  return (
    <BaseNode>
      <BaseNodeContent className="bg-red-100">simple node</BaseNodeContent>
    </BaseNode>
  );
});

SimpleBaseNode.displayName = "SimpleBaseNode";
