import { Badge } from "@/components/ui/badge";
import { BaseNode, BaseNodeContent } from "@/registry/components/base-node";
import { NodeAppendix } from "@/registry/components/node-appendix";
import { BadgeCheckIcon } from "lucide-react";

export const NodeBadgeDemo = () => {
  return (
    <BaseNode>
      <NodeAppendix position="top" className="border-none bg-transparent p-0">
        <Badge
          className="bg-background gap-1 self-end border-green-400 p-1 text-xs text-green-500"
          variant="outline"
        >
          <BadgeCheckIcon className="size-4" />
          I&apos;m a node badge!
        </Badge>
      </NodeAppendix>
      <BaseNodeContent>
        NodeAppendix can be <br />
        used to display a badge
      </BaseNodeContent>
    </BaseNode>
  );
};

NodeBadgeDemo.displayName = "NodeBadgeDemo";
