"use client";

import { Background, Position, ReactFlow } from "@xyflow/react";
import { StepperNode, type StepperNodeType } from "@/registry/components/stepper-node";

const nodeTypes = {
  stepper: StepperNode,
};

const defaultNodes: StepperNodeType[] = [
  {
    id: "1",
    position: { x: 100, y: 150 },
    data: {
      label: "Linear Stepper",
      step: 2,
      minStep: 0,
      maxStep: 10,
      stepSize: 1,
      design: "linear",
      mode: "counter",
    },
    type: "stepper",
  },
  {
    id: "2",
    position: { x: 400, y: 150 },
    data: {
      label: "Timer Mode (Auto Increment)",
      step: 0,
      minStep: 0,
      maxStep: 100,
      stepSize: 5,
      design: "linear",
      mode: "timer",
    },
    type: "stepper",
  },
  {
    id: "3",
    position: { x: 100, y: 350 },
    data: {
      label: "Circular Stepper",
      step: 5,
      minStep: 0,
      maxStep: 20,
      stepSize: 2,
      design: "circular",
      mode: "counter",
    },
    type: "stepper",
  },

  {
    id: "4",
    position: { x: 400, y: 350 },
    data: {
      label: "Persistent Stepper",
      step: 3,
      minStep: 0,
      maxStep: 10,
      stepSize: 1,
      design: "circular",
      mode: "counter",
      persist: true,
    },
    type: "stepper",
  },
];

export default function StepperNodeDemo() {
  return (
    <div className="h-full w-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        defaultNodes={defaultNodes}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
