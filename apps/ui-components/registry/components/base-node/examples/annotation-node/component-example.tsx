import { memo } from "react";

import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
} from "@/registry/components/base-node";
import { ArrowDownRight } from "lucide-react";

export const AnnotationNodeDemo = memo(() => {
  return (
    <BaseNode className="text-secondary-foreground border-none bg-transparent text-sm hover:ring-0">
      {/* Annotation Node Number */}
      <div className="absolute top-3 -left-1 text-xs leading-snug">1.</div>
      <BaseNodeContent className="pb-0 leading-snug">
        Annotate your flows any way you&apos;d like.
      </BaseNodeContent>
      <BaseNodeFooter className="items-end border-none p-0">
        <ArrowDownRight size="12" />
      </BaseNodeFooter>
    </BaseNode>
  );
});

AnnotationNodeDemo.displayName = "AnnotationNodeDemo";

export const BaseNodeDemo = memo(() => {
  return (
    <BaseNode>
      <BaseNodeContent>
        This is a base node that can be annotated.
      </BaseNodeContent>
    </BaseNode>
  );
});

BaseNodeDemo.displayName = "BaseNodeDemo";
