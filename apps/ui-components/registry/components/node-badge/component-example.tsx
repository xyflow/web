import { NodeBadge, NodeBadgeContent } from "@/registry/components/node-badge";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "../base-node";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";

const NodeBadgeDemo = () => {
  const [visible, setVisible] = useState(true);
  return (
    <NodeBadge visible={visible}>
      <NodeBadgeContent className="right-0">
        <Badge
          className="gap-1 border-green-400 p-1 text-xs text-green-500"
          variant="outline"
        >
          <BadgeCheckIcon className="size-4" />
          I'm a node badge!
        </Badge>
      </NodeBadgeContent>
      <BaseNode>
        <BaseNodeHeader>
          <BaseNodeHeaderTitle>Your node contents go here</BaseNodeHeaderTitle>
        </BaseNodeHeader>
        <BaseNodeContent>
          <Toggle
            aria-label="Show badge"
            pressed={visible}
            onPressedChange={setVisible}
            className=""
            variant="outline"
          >
            {visible ? "Hide Badge" : "Show Badge"}
          </Toggle>
        </BaseNodeContent>
      </BaseNode>
    </NodeBadge>
  );
};

export default NodeBadgeDemo;
