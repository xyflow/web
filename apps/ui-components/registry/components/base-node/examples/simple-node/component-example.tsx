import { memo } from "react";

import { BaseNode, BaseNodeContent } from "@/registry/components/base-node";

export const SimpleBaseNode = memo(() => {
  return (
    <BaseNode>
      <BaseNodeContent>Simple Node</BaseNodeContent>
    </BaseNode>
  );
});

SimpleBaseNode.displayName = "SimpleBaseNode";
