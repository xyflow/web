import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export const NodeAppendixDemo = () => {
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
            variant="outline"
          >
            {visible ? "Hide" : "Show"} results
          </Button>
          {/* Appendix Position Select */}
          <Select
            value={appendixPosition}
            onValueChange={(v) =>
              setAppendixPosition(v as "top" | "bottom" | "left" | "right")
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="bottom">Bottom</SelectItem>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </BaseNodeContent>
      </BaseNode>
    </NodeAppendix>
  );
};
