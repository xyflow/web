"use client";

import { Background, ReactFlow } from "@xyflow/react";
import { AnnotationNode } from "@/registry/components/annotation-node";

const nodeTypes = {
  annotationNode: AnnotationNode,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      level: 1,
      label:
        'Annotate your flows any way you like.',
      arrowStyle: {
        right: 0,
        bottom: 0,
        transform: 'translate(-30px,10px) rotate(-80deg)',
      },
      arrow: "⤹",
    },
    type: "annotationNode",
  },
  {
    id: "2",
    position: { x: 150, y: 75 },
    data: { label: 'Default Node'},
    type: "default",
  },
];

export default function AnnotationNodeDemo() {
  return (
    <div className="h-full w-full">
      <ReactFlow nodeTypes={nodeTypes} defaultNodes={defaultNodes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
