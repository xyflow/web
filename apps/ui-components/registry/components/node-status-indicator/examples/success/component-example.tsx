import { BaseNode, BaseNodeContent } from "@/registry/components/base-node";
import { NodeStatusIndicator } from "@/registry/components/node-status-indicator";

export const SuccessNode = () => {
  return (
    <>
      <NodeStatusIndicator status="success">
        <BaseNode>
          <BaseNodeContent>This node is successful</BaseNodeContent>
        </BaseNode>
      </NodeStatusIndicator>
    </>
  );
};
