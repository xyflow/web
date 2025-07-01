import { NodeBadge, NodeBadgeContent } from "@/registry/components/node-badge";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "../base-node";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

const NodeBadgeDemo = () => {
  const [visible, setVisible] = useState(true);
  return (
    <NodeBadge visible={visible}>
      <NodeBadgeContent>
        <div className="rounded-md border border-green-200 bg-green-100 p-1 text-xs text-green-900">
          {visible ? "Visible" : "Hidden"}
        </div>
      </NodeBadgeContent>
      <BaseNode>
        <BaseNodeHeader>
          <BaseNodeHeaderTitle>Node with a Badge</BaseNodeHeaderTitle>
        </BaseNodeHeader>
        <BaseNodeContent>
          {/* Check item */}
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
