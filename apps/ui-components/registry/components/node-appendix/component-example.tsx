import { Button } from "@/components/ui/button";
import {
  NodeAppendix,
  NodeAppendixContent,
} from "@/registry/components/node-appendix";
import { useState } from "react";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "../base-node";

const NodeAppendixDemo = () => {
  const [visible, setVisible] = useState(false);

  const [numberA, setNumberA] = useState(2);
  const [numberB, setNumberB] = useState(2);

  const sum = numberA + numberB;

  const [appendixPosition, setAppendixPosition] = useState<
    "top" | "bottom" | "left" | "right"
  >("bottom");

  return (
    <NodeAppendix visible={visible}>
      <NodeAppendixContent position={appendixPosition}>
        Result is {sum}
      </NodeAppendixContent>
      <BaseNode>
        <BaseNodeHeader>
          <BaseNodeHeaderTitle>Add two numbers</BaseNodeHeaderTitle>
        </BaseNodeHeader>
        <BaseNodeContent>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={numberA}
              onChange={(e) => setNumberA(Number(e.target.value))}
              className="w-16 rounded border p-1"
            />
            <input
              type="number"
              value={numberB}
              onChange={(e) => setNumberB(Number(e.target.value))}
              className="w-16 rounded border p-1"
            />
          </div>
          <Button
            aria-label="Show appendix"
            onClick={() => setVisible((prev) => !prev)}
            className=""
            variant="outline"
          >
            {visible ? "Hide" : "Show"} results
          </Button>
          {/* Appendix Position Select */}
          <select
            value={appendixPosition}
            onChange={(e) =>
              setAppendixPosition(
                e.target.value as "top" | "bottom" | "left" | "right",
              )
            }
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </BaseNodeContent>
      </BaseNode>
    </NodeAppendix>
  );
};

export default NodeAppendixDemo;
