import { BaseNode, BaseNodeContent } from "@/registry/components/base-node";
import { NodeStatusIndicator } from "@/registry/components/node-status-indicator";

export const LoadingNode = () => {
  return (
    <>
      <NodeStatusIndicator status="loading" loadingVariant="border">
        <BaseNode>
          <BaseNodeContent>This node is loading</BaseNodeContent>
        </BaseNode>
      </NodeStatusIndicator>
    </>
  );
};

export const LoadingNodeOverlay = () => {
  return (
    <NodeStatusIndicator status="loading" loadingVariant="overlay">
      <BaseNode>
        <BaseNodeContent>Node Loading...</BaseNodeContent>
      </BaseNode>
    </NodeStatusIndicator>
  );
};

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
