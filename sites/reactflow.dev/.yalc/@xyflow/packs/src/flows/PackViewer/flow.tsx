import { useState, useCallback, useMemo, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  Controls,
  Panel,
  MiniMap,
  Background,
  type NodeProps,
  type EdgeProps,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

import wrapNode from "./wrapNode";
import wrapEdge from "./wrapEdge";
import Toggles from "./Toggles";
import { getPathBoundingBox } from "./utils";

const DURATION = 350;
const FOCUS_PADDING = 50;

function calculateZoom(
  width: number,
  height: number,
  containerWidth: number,
  containerHeight: number,
  padding: number,
) {
  const widthZoom = containerWidth / (width + padding * 2);
  const heightZoom = containerHeight / (height + padding * 2);
  return Math.min(widthZoom, heightZoom);
}

enum FlowInitState {
  Initial = 0,
  Rendered,
  ViewportFocused,
}

type FlowProps = {
  flowConfig: ReactFlowConfig;
  onNodeClick: (nodeType: string, nodeId: string) => void;
  onEdgeClick: (edgeType: string, edgeId: string) => void;
  focus: { node?: string; edge?: string };
  focusedFlowSize: { width: number; height: number };
  skipAnimation: boolean;
};

export default ({
  flowConfig,
  onNodeClick,
  onEdgeClick,
  focus,
  focusedFlowSize,
  skipAnimation,
}: FlowProps) => {
  const [nodes, setNodes] = useState(flowConfig.flowProps?.nodes!);
  const [edges, setEdges] = useState(flowConfig.flowProps?.edges!);
  const [inspecting, setInspecting] = useState(true);
  const [flowInitState, setFlowInitState] = useState<FlowInitState>(
    FlowInitState.Initial,
  );

  const viewport = useReactFlow();

  useEffect(() => {
    if (flowInitState === FlowInitState.Initial && nodes[0].width) {
      setFlowInitState(FlowInitState.Rendered);
    }
  }, [nodes]);

  useEffect(() => {
    // node & edge positions are not available until the first render
    if (flowInitState === FlowInitState.Initial) {
      return;
    }

    if (focus.node && focus.edge) {
      // Don't support focusing multiple nodes & edges
      return;
    }

    if (!focus.node && !focus.edge) {
      viewport.fitView({ nodes, duration: DURATION });
      return;
    }

    if (focus.node) {
      const node = nodes?.find((n) => n.id === focus.node);
      const zoom = calculateZoom(
        node.width,
        node.height,
        focusedFlowSize.width,
        focusedFlowSize.height,
        FOCUS_PADDING,
      );

      viewport.setViewport(
        {
          x: -node.position.x * zoom + focusedFlowSize.width * 0.5,
          y: -node.position.y * zoom + focusedFlowSize.height * 0.5,
          zoom,
        },
        { duration: skipAnimation ? 0 : 350 },
      );
      setFlowInitState(FlowInitState.ViewportFocused);
      return;
    }

    if (focus.edge) {
      const svgGroup = document.querySelector<SVGElement>(
        `[data-testid="rf__edge-${focus.edge}"]`,
      );

      if (!svgGroup) {
        return;
      }

      const edgeBB = getPathBoundingBox(svgGroup, viewport);

      const zoom = calculateZoom(
        edgeBB.width,
        edgeBB.height,
        focusedFlowSize.width,
        focusedFlowSize.height,
        FOCUS_PADDING,
      );

      viewport.setViewport(
        {
          x:
            -edgeBB.x * zoom +
            focusedFlowSize.width * 0.5 -
            edgeBB.width * 0.5 * zoom,
          y:
            -edgeBB.y * zoom +
            focusedFlowSize.height * 0.5 -
            edgeBB.height * 0.5 * zoom,
          zoom: zoom,
        },
        { duration: skipAnimation ? 0 : 350 },
      );
      setFlowInitState(FlowInitState.ViewportFocused);
      return;
    }
  }, [focus, flowInitState]);

  const wrappedNodeTypes = useMemo(
    () =>
      Object.entries<React.ComponentType<NodeProps>>(
        flowConfig.flowProps?.nodeTypes,
      ).reduce(
        (acc: Record<string, React.ComponentType<NodeProps>>, [key, value]) => {
          acc[key] = wrapNode(value, onNodeClick);
          return acc;
        },
        {},
      ),
    [],
  );

  const wrappedEdgeTypes = useMemo(
    () =>
      Object.entries<React.ComponentType<EdgeProps>>(
        flowConfig.flowProps?.edgeTypes,
      ).reduce(
        (acc: Record<string, React.ComponentType<EdgeProps>>, [key, value]) => {
          acc[key] = wrapEdge(value, onEdgeClick);
          return acc;
        },
        {},
      ),
    [],
  );

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds!)),
    [],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds!)),
    [],
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds!)),
    [],
  );

  return (
    <ReactFlow
      {...flowConfig.flowProps}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={
        !inspecting ? flowConfig.flowProps?.nodeTypes : wrappedNodeTypes
      }
      edgeTypes={
        !inspecting ? flowConfig.flowProps?.edgeTypes : wrappedEdgeTypes
      }
      nodeOrigin={[0.5, 0.5]}
      minZoom={0.0000001}
      maxZoom={Number.MAX_VALUE}
      style={{
        opacity:
          flowInitState !== FlowInitState.ViewportFocused && skipAnimation
            ? 0
            : 1,
      }}
    >
      {flowConfig.controlsProps && <Controls {...flowConfig.controlsProps} />}
      {flowConfig.panelProps && <Panel {...flowConfig.panelProps} />}
      {flowConfig.minimapProps && <MiniMap {...flowConfig.minimapProps} />}
      {flowConfig.backgroundProps && (
        <Background {...flowConfig.backgroundProps} className="bg-gray-50" />
      )}

      <Toggles
        inspecting={inspecting}
        setInspecting={setInspecting}
        hideButton={!focus.node && !focus.edge}
      />
    </ReactFlow>
  );
};
