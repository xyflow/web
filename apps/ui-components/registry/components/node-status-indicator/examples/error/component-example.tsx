import { BaseNode, BaseNodeContent } from "@/registry/components/base-node";
import { NodeStatusIndicator } from "@/registry/components/node-status-indicator";

export const ErrorNode = () => {
  return (
    <>
      <NodeStatusIndicator status="error">
        <BaseNode>
          <BaseNodeContent>This node has encountered an error</BaseNodeContent>
        </BaseNode>
      </NodeStatusIndicator>
    </>
  );
};
