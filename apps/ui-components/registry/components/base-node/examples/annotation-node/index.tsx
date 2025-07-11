import { Background, ReactFlow } from "@xyflow/react";

import { AnnotationBaseNodeDemo } from "./component-example";

const nodeTypes = {
  annotationNode: AnnotationBaseNodeDemo,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: -100, y: 150 },
    data: { label: "Annotation 1" },
    type: "annotationNode",
  },
];

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
