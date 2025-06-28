import React, { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";

import {
  NodeTooltip,
  NodeTooltipContent,
  NodeTooltipTrigger,
} from "@/registry/components/node-tooltip";
import { BaseNode, BaseNodeContent } from "../base-node";

const NodeTooltipDemo = memo(() => {
  return (
    <NodeTooltip>
      <NodeTooltipContent position={Position.Top}>
        Hidden Content
      </NodeTooltipContent>
      <BaseNode>
        <BaseNodeContent>
          <NodeTooltipTrigger className="hover:bg-red-500">
            Hover
          </NodeTooltipTrigger>
        </BaseNodeContent>
      </BaseNode>
    </NodeTooltip>
  );
});

export default NodeTooltipDemo;
