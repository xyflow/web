/// <reference types="astro/client" />

import {
  BackgroundProps as ReactBackgroundProps,
  ControlProps as ReactControlsProps,
  Edge as ReactEdge,
  MiniMapProps as ReactMiniMapProps,
  Node as ReactNode,
  PanelProps as ReactPanelProps,
  ReactFlowProps,
} from "@xyflow/react";

import type {
  BackgroundProps as SvelteBackgroundProps,
  Edge as SvelteEdge,
  MiniMapProps as SvelteMiniMapProps,
  Node as SvelteNode,
  PanelProps as SveltePanelProps,
  SvelteFlowProps as SvelteFlowProps,
} from "@xyflow/svelte";

declare global {
  interface SvelteFlowConfig {
    flowProps?: Omit<SvelteFlowProps, "nodes" | "edges"> & {
      nodes: SvelteNode[];
      edges?: SvelteEdge[];
    };
    panelProps?: SveltePanelProps;
    backgroundProps?: SvelteBackgroundProps;
    controlsProps?: SvelteControlsProps;
    minimapProps?: SvelteMiniMapProps;
  }

  interface ReactFlowConfig {
    flowProps?: Omit<ReactFlowProps, "nodes" | "edges"> & {
      nodes: ReactNode[];
      edges?: ReactEdge[];
    };
    panelProps?: ReactPanelProps;
    backgroundProps?: ReactBackgroundProps;
    controlsProps?: ReactControlProps;
    minimapProps?: ReactMiniMapProps;
  }
}
