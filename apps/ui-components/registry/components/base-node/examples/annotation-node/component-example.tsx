import { memo } from "react";

import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
} from "@/registry/components/base-node";
import { ArrowDownRight } from "lucide-react";

export const AnnotationNodeDemo = memo(() => {
  return (
    <BaseNode className="border-none bg-transparent text-sm text-secondary-foreground hover:ring-0">
      {/* Annotation Node Number */}
      <div className="absolute -left-1 top-3 text-xs leading-snug">1.</div>
      <BaseNodeContent className="pb-0 leading-snug">
        Annotate your flows any way you'd like.
      </BaseNodeContent>
      <BaseNodeFooter className="items-end border-none p-0">
        <ArrowDownRight size="12" />
      </BaseNodeFooter>
    </BaseNode>
  );
});

export const BaseNodeDemo = memo(() => {
  return (
    <BaseNode>
      <BaseNodeContent>
        This is a base node that can be annotated.
      </BaseNodeContent>
    </BaseNode>
  );
});
