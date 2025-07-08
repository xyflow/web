import { memo } from "react";

import { NodeProps } from "@xyflow/react";
import { BaseNode } from "@/registry/components/base-node";

const BaseNodeFooDemo = memo(({ selected }: NodeProps) => {
  return (
    <BaseNode selected={selected}>
      <div>Foo Bar Example</div>
    </BaseNode>
  );
});

export default BaseNodeFooDemo;
