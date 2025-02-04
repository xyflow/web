import { ArrowDownRight } from "lucide-react";

import {
  AnnotationNode,
  AnnotationNodeContent,
  AnnotationNodeIcon,
  AnnotationNodeNumber,
} from "@/registry/components/annotation-node";

const CustomNode = () => {
  return (
    <AnnotationNode>
      <AnnotationNodeNumber>1.</AnnotationNodeNumber>
      <AnnotationNodeContent>
        Annotate your flows any way you'd like.
      </AnnotationNodeContent>
      <AnnotationNodeIcon className="bottom-0 right-2">
        <ArrowDownRight />
      </AnnotationNodeIcon>
    </AnnotationNode>
  );
};

export default CustomNode;
