import { BaseNode, BaseNodeContent } from "@/registry/components/base-node";
import { NodeStatusIndicator } from "@/registry/components/node-status-indicator";

export const LoadingNode = () => {
  return (
    <>
      <NodeStatusIndicator status="loading" variant="overlay">
        <BaseNode>
          <BaseNodeContent>This node is loading</BaseNodeContent>
        </BaseNode>
      </NodeStatusIndicator>
    </>
  );
};
