import { SourceHandle } from "@/registry/components/source-handle";

import { BaseNode } from "@/registry/components/base-node";

import { Position } from "@xyflow/react";

const SourceHandleDemo = () => {
  return (
    <BaseNode>
      Base Node
      <SourceHandle position={Position.Right} />
    </BaseNode>
  );
};

export default SourceHandleDemo;
