import { memo } from "react";

import { NodeProps } from "@xyflow/react";
import { BaseNode } from "@/registry/components/base-node";

const BaseNodeDemo = memo(({ selected }: NodeProps) => {
  return (
    <BaseNode selected={selected}>
      <div>Base Node</div>
    </BaseNode>
  );
});

export default BaseNodeDemo;
