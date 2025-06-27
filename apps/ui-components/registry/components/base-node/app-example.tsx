import { Background, ReactFlow } from "@xyflow/react";

import {
  AnnotationBaseNodeDemo,
  BaseNodeFullDemo,
  BaseNodeSimpleDemo,
} from "./component-example";

const nodeTypes = {
  baseNodeSimple: BaseNodeSimpleDemo,
  baseNodeFull: BaseNodeFullDemo,
  annotationNode: AnnotationBaseNodeDemo,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: 0, y: 280 },
    data: {},
    type: "baseNodeSimple",
  },
  {
    id: "2",
    position: { x: 200, y: 200 },
    data: {},
    type: "baseNodeFull",
  },
  {
    id: "1b",
    position: { x: -100, y: 150 },
    parentId: "1a",
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
