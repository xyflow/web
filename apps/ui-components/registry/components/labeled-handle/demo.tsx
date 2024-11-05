import React, { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";

import { LabeledHandle } from "@/registry/components/labeled-handle";
import { BaseNode } from "@/registry/components/base-node";

// You can use Handle components only inside of custom nodes.
const CustomNode = memo(({ selected }: NodeProps) => {
  return (
    <BaseNode className="flex px-0 py-5" selected={selected}>
      <div className="mr-5">
        <LabeledHandle
          id="target-1"
          title="Some Input"
          type="target"
          position={Position.Left}
        />
        <LabeledHandle
          id="target-2"
          title="Another Input"
          type="target"
          position={Position.Left}
        />
        <LabeledHandle
          id="target-3"
          title="And Another Input"
          type="target"
          position={Position.Left}
        />
      </div>
      <div>
        <LabeledHandle
          id="source-1"
          title="Some Output"
          type="source"
          position={Position.Right}
        />
        <LabeledHandle
          id="source-2"
          title="Another Output"
          type="source"
          position={Position.Right}
        />
        <LabeledHandle
          id="source-3"
          title="And Another Output"
          type="source"
          position={Position.Right}
        />
      </div>
    </BaseNode>
  );
});

CustomNode.displayName = "LabeledHandleDemo";

export default CustomNode;
