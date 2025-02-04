import React, { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";

import { LabeledHandle } from "@/registry/components/labeled-handle";
import { BaseNode } from "@/registry/components/base-node";

const CustomNode = memo(({ selected }: NodeProps) => {
  return (
    <BaseNode className="flex px-0 py-5" selected={selected}>
      <LabeledHandle
        id="target-1"
        title="Some Input"
        type="target"
        position={Position.Left}
      />
      <LabeledHandle
        id="source-1"
        title="Some Output"
        type="source"
        position={Position.Right}
      />
    </BaseNode>
  );
});

CustomNode.displayName = "LabeledHandleDemo";

export default CustomNode;
