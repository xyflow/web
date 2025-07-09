import { memo } from "react";

import { Button } from "@/components/ui/button";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/registry/components/base-node";
import { Rocket } from "lucide-react";

export const BaseNodeFullDemo = memo(() => {
  return (
    <BaseNode className="w-96">
      <BaseNodeHeader className="border-b">
        <Rocket className="size-4" />
        <BaseNodeHeaderTitle>Base Node With Header</BaseNodeHeaderTitle>
      </BaseNodeHeader>
      <BaseNodeContent>
        <h3 className="text-lg font-bold">Content</h3>
        <p className="text-xs">
          This is a full-featured node with a header, content, and footer. You
          can customize it as needed.
        </p>
      </BaseNodeContent>
      <BaseNodeFooter>
        <h4 className="text-md self-start font-bold">Footer</h4>

        <Button variant="outline" className="nodrag w-full">
          Action 1
        </Button>
      </BaseNodeFooter>
    </BaseNode>
  );
});

BaseNodeFullDemo.displayName = "BaseNodeFullDemo";
