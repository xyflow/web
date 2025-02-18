import {
  WorkflowNode,
  WorkflowNodeHandles,
  WorkflowNodeContent,
} from "@/registry/components/workflow-node";

import {
  NodeHeaderTitle,
  NodeHeader,
  NodeHeaderActions,
  NodeHeaderAction,
  NodeHeaderIcon,
  NodeHeaderDeleteAction,
} from "@/registry/components/node-header";

import { Play, Rocket } from "lucide-react";

// This is an example of how to implement the WorkflowNode component. All the nodes in the Workflow Builder example
// are variations on this CustomNode defined in the index.tsx file.
// You can also create new components for each of your nodes for greater flexibility.
const WorkflowNodeDemo = () => {
  return (
    <WorkflowNode status="success">
      <NodeHeader>
        <NodeHeaderIcon>
          <Rocket />
        </NodeHeaderIcon>
        <NodeHeaderTitle>Node Title</NodeHeaderTitle>
        <NodeHeaderActions>
          <NodeHeaderAction
            onClick={() => console.log("clicked")}
            label="Run node"
          >
            <Play className="fill-blue-500 stroke-blue-500" />
          </NodeHeaderAction>
          <NodeHeaderDeleteAction />
        </NodeHeaderActions>
      </NodeHeader>
      <WorkflowNodeContent>Node Label</WorkflowNodeContent>
      <WorkflowNodeHandles handles="join" />
    </WorkflowNode>
  );
};

export default WorkflowNodeDemo;
