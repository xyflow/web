import { NodeStatusIndicator } from "@/registry/components/node-status-indicator";
import { BaseNode } from "@/registry/components/base-node";

const NodeStatusIndicatorDemo = () => {
  return (
    <>
      <NodeStatusIndicator status="loading">
        <BaseNode>Demo Node</BaseNode>
      </NodeStatusIndicator>
    </>
  );
};

export default NodeStatusIndicatorDemo;
