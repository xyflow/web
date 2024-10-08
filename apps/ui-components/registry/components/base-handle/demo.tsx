import React, { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";

import { BaseHandle } from "@/registry/components/base-handle";
import { BaseNode } from "@/registry/components/base-node";

// You can use Handle components only inside of custom nodes. this is a test
const CustomNode = memo(({ selected }: NodeProps) => {
  return (
    <BaseNode className="flex px-0 py-5" selected={selected}>
      <BaseHandle id="target-1" type="target" position={Position.Left} />
      <div className="mx-10">A node with two handles</div>
      <BaseHandle id="source-1" type="source" position={Position.Right} />
    </BaseNode>
  );
});

CustomNode.displayName = "BaseHandleDemo";

export default CustomNode;
