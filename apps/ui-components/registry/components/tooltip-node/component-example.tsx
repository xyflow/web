import React, { memo } from "react";
import { NodeProps, Position } from "@xyflow/react";

import {
  TooltipNode,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/components/tooltip-node";
import { BaseNodeContent } from "../base-node";

const TooltipNodeDemo = memo(() => {
  return (
    <TooltipNode>
      <TooltipContent position={Position.Top}>Hidden Content</TooltipContent>
      <BaseNodeContent>
        <TooltipTrigger>Hover</TooltipTrigger>
      </BaseNodeContent>
    </TooltipNode>
  );
});

export default TooltipNodeDemo;
