import {
  NodeAppendix,
  NodeAppendixContent,
} from "@/registry/components/node-appendix";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "../base-node";

export const NodeAppendixDemo = () => {
  return (
    <NodeAppendix visible={true}>
      <NodeAppendixContent position="bottom" className="p-2">
        Add custom content to the node appendix.
      </NodeAppendixContent>
      <BaseNode>
        <BaseNodeHeader className="border-b">
          <BaseNodeHeaderTitle>Custom Node</BaseNodeHeaderTitle>
        </BaseNodeHeader>
        <BaseNodeContent>
          <p>Node Content goes here.</p>
        </BaseNodeContent>
      </BaseNode>
    </NodeAppendix>
  );
};
