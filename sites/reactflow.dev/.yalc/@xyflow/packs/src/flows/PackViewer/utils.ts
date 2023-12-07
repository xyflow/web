import type { ReactFlowInstance } from "reactflow";

export function getPathBoundingBox(
  path: SVGElement,
  reactFlowInstance: ReactFlowInstance,
) {
  const pathBBox = path.getBoundingClientRect();

  const zoom = reactFlowInstance.getZoom();

  const flowPosition = reactFlowInstance.screenToFlowPosition({
    x: pathBBox.x,
    y: pathBBox.y,
  });

  return {
    width: pathBBox.width / zoom,
    height: pathBBox.height / zoom,
    x: flowPosition.x,
    y: flowPosition.y,
  };
}
