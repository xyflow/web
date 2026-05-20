import React, { memo } from "react";
import { Position } from "@xyflow/react";

import { BaseHandle } from "@/registry/components/base-handle";
import { BaseNode, BaseNodeContent } from "@/registry/components/base-node";

const BaseHandleDemo = memo(() => {
  return (
    <BaseNode>
      <BaseNodeContent>
        <BaseHandle id="target-1" type="target" position={Position.Left} />
        <div>A node with two handles</div>
        <BaseHandle id="source-1" type="source" position={Position.Right} />
      </BaseNodeContent>
    </BaseNode>
  );
});

BaseHandleDemo.displayName = "BaseHandleDemo";
export default BaseHandleDemo;
