import type { Edge, EdgeProps, Position } from "@xyflow/react";
import {
  BaseEdge,
  getBezierPath,
  getStraightPath,
  getSmoothStepPath,
} from "@xyflow/react";

export type AnimatedSvgEdge = Edge<{
  /**
   * The amount of time it takes, in seconds, to move the shape one from end of
   * the edge path to the other.
   */
  duration: number;
  /**
   * The direction in which the shape moves along the edge path. Each value
   * corresponds to the following behaviour:
   *
   * - `forward`: The shape moves from the source node to the target node.
   *
   * - `reverse`: The shape moves from the target node to the source node.
   *
   * - `alternate`: The shape moves from the source node to the target node and
   *   then back to the source node.
   *
   * - `alternate-reverse`: The shape moves from the target node to the source
   *   node and then back to the target node.
   *
   * If not provided, this defaults to `"forward"`.
   */
  direction?: "forward" | "reverse" | "alternate" | "alternate-reverse";
  /**
   * Which of React Flow's path algorithms to use. Each value corresponds to one
   * of React Flow's built-in edge types.
   *
   * If not provided, this defaults to `"bezier"`.
   */
  path?: "bezier" | "smoothstep" | "step" | "straight";
  /**
   * The number of times to repeat the animation before stopping. If set to
   * `"indefinite"`, the animation will repeat indefinitely.
   *
   * If not provided, this defaults to `"indefinite"`.
   */
  repeat?: number | "indefinite";
  shape: keyof typeof shapes;
}>;

/**
 * The `AnimatedSvgEdge` component renders a typical React Flow edge and animates
 * an SVG shape along the edge's path.
 */
export function AnimatedSvgEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data = {
    duration: 2,
    direction: "forward",
    path: "bezier",
    repeat: "indefinite",
    shape: "circle",
  },
  ...delegated
}: EdgeProps<AnimatedSvgEdge>) {
  const Shape = shapes[data.shape];

  const [path] = getPath({
    type: data.path ?? "bezier",
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const animateMotionProps = getAnimateMotionProps({
    duration: data.duration,
    direction: data.direction ?? "forward",
    repeat: data.repeat ?? "indefinite",
    path,
  });

  return (
    <>
      <BaseEdge id={id} path={path} {...delegated} />
      <Shape animateMotionProps={animateMotionProps} />
    </>
  );
}

type AnimateMotionProps = {
  dur: string;
  keyTimes: string;
  keyPoints: string;
  repeatCount: number | "indefinite";
  path: string;
};

type AnimatedSvg = React.FC<{ animateMotionProps: AnimateMotionProps }>;

const shapes = {
  circle: ({ animateMotionProps }) => (
    <circle r="5" fill="#ff0073">
      <animateMotion {...animateMotionProps} />
    </circle>
  ),
  square: ({ animateMotionProps }) => (
    <rect width="10" height="10" fill="#ff0073">
      <animateMotion {...animateMotionProps} />
    </rect>
  ),
  triangle: ({ animateMotionProps }) => (
    <polygon points="0,-5 5,5 -5,5" fill="#ff0073">
      <animateMotion {...animateMotionProps} />
    </polygon>
  ),
} satisfies Record<string, AnimatedSvg>;

/**
 * Chooses which of React Flow's edge path algorithms to use based on the provided
 * `type`.
 */
function getPath({
  type,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: {
  type: "bezier" | "smoothstep" | "step" | "straight";
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
}) {
  switch (type) {
    case "bezier":
      return getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
      });

    case "smoothstep":
      return getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
      });

    case "step":
      return getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        borderRadius: 0,
      });

    case "straight":
      return getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
      });
  }
}

/**
 * Construct the props for an `<animateMotion />` element based on an
 * `AnimatedSvgEdge`'s data.
 */
function getAnimateMotionProps({
  duration,
  direction,
  repeat,
  path,
}: {
  duration: number;
  direction: "forward" | "reverse" | "alternate" | "alternate-reverse";
  repeat: number | "indefinite";
  path: string;
}) {
  const base = {
    path,
    repeatCount: repeat,
    // The default calcMode for the `<animateMotion />` element is "paced", which
    // is not compatible with the `keyPoints` attribute. Setting this to "linear"
    // ensures that the shape correc follows the path.
    calcMode: "linear",
  };

  switch (direction) {
    case "forward":
      return {
        ...base,
        dur: `${duration}s`,
        keyTimes: "0;1",
        keyPoints: "0;1",
      };

    case "reverse":
      return {
        ...base,
        dur: `${duration}s`,
        keyTimes: "0;1",
        keyPoints: "1;0",
      };

    case "alternate":
      return {
        ...base,
        // By doubling the animation duration, the time spent moving from one end
        // to the other remains consistent when switching between directions.
        dur: `${duration * 2}s`,
        keyTimes: "0;0.5;1",
        keyPoints: "0;1;0",
      };

    case "alternate-reverse":
      return {
        ...base,
        dur: `${duration * 2}s`,
        keyTimes: "0;0.5;1",
        keyPoints: "1;0;1",
      };
  }
}
