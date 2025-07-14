import { NodeAppendix } from "@/registry/components/node-appendix";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "../base-node";

export const NodeAppendixDemo = () => {
  return (
    <BaseNode>
      <NodeAppendix position="bottom" className="p-2">
        Add custom content to the node appendix.
      </NodeAppendix>
      <BaseNodeHeader className="border-b">
        <BaseNodeHeaderTitle>Custom Node</BaseNodeHeaderTitle>
      </BaseNodeHeader>
      <BaseNodeContent>
        <p>Node Content goes here.</p>
      </BaseNodeContent>
    </BaseNode>
  );
};
