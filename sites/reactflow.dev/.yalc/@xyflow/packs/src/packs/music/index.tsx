import ReactDevFlow from "../../flows/ReactDevFlow";
import { createPackViewer } from "../../flows/PackViewer";

import Adsr from "./adsr/Adsr";
import Amp from "./amp/Amp";
import Osc from "./osc/Osc";
import Xy from "./xy/Xy";

import AudioEdge from "./audioedge/AudioEdge.tsx";

export const flowConfig: ReactFlowConfig = {
  flowProps: {
    nodes: [
      {
        id: "1",
        data: {
          frequency: 220,
          waveform: "triangle",
        },
        position: { x: 0, y: 0 },
        type: "Osc",
      },
      {
        id: "2",
        data: {
          attack: 200,
          decay: 600,
          sustain: 0.5,
          release: 100,
        },
        position: { x: 500, y: 175 },
        type: "Adsr",
      },
      {
        id: "3",
        data: {
          x: 0.5,
          y: 0.5,
        },
        position: { x: 125, y: 250 },
        type: "Xy",
      },
      {
        id: "4",
        data: {
          gain: 0.5,
        },
        position: { x: 850, y: 400 },
        type: "Amp",
      },
    ],
    edges: [
      {
        id: "1->2",
        source: "1",
        target: "2",
        targetHandle: "in",
        type: "AudioEdge",
        data: {
          title: "AudioEdge",
        },
      },
      {
        id: "2->4",
        source: "2",
        target: "4",
        targetHandle: "in",
        type: "AudioEdge",
        data: {
          title: "AudioEdge",
        },
      },
      {
        id: "3->4",
        source: "3",
        target: "4",
        type: "AudioEdge",
        data: {
          title: "AudioEdge",
        },
        sourceHandle: "y",
        targetHandle: "gain",
      },
    ],
    nodeTypes: {
      Adsr,
      Amp,
      Osc,
      Xy,
    },
    edgeTypes: {
      AudioEdge,
    },
    defaultEdgeOptions: {
      type: "AudioEdge",
    },
    fitView: true,
  },
  backgroundProps: {},
};

export const samples = {
  ...flowConfig.flowProps?.nodeTypes,
  ...flowConfig.flowProps?.edgeTypes,
};

// This exports a minimal flow for development
export const DevFlow = () => <ReactDevFlow flowConfig={flowConfig} />;

// This exports the pack viewer for production
export default createPackViewer(flowConfig);
