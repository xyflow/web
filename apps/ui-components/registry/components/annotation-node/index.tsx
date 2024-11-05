import { type Node, type NodeProps } from "@xyflow/react";
import { CSSProperties } from "react";

type AnnotationNode = Node<{
  label: string;
  level: number;
  arrow: string;
  arrowStyle: CSSProperties; 
}>;

export function AnnotationNode({ data }: NodeProps<AnnotationNode>) {
  return (
    <div className="relative flex max-w-[180px] items-start p-2 text-sm text-secondary-foreground">
      <div className="mr-1 leading-snug">{data.level}.</div>
      <div className="leading-snug">{data.label}</div>
      {data.arrowStyle && (
        <div
          className="absolute text-2xl"
          style={{
            right: data.arrowStyle.right,
            bottom: data.arrowStyle.bottom,
            transform: data.arrowStyle.transform,
          }}
        >
          {data.arrow}
        </div>
      )}
    </div>
  );
}

AnnotationNode.displayName = "AnnotationNode";
