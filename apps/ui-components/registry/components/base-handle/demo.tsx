import React, { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";

import { BaseHandle } from "@/registry/components/base-handle";
import { BaseNode } from "@/registry/components/base-node";

const BaseHandleDemo = memo(({ selected }: NodeProps) => {
  return (
    <BaseNode selected={selected}>
      <BaseHandle id="target-1" type="target" position={Position.Left} />
      <div>A node with two handles</div>
      <BaseHandle id="source-1" type="source" position={Position.Right} />
    </BaseNode>
  );
});

export default BaseHandleDemo;
