import { memo } from "react";
import { EdgeProps } from "@xyflow/react";
import { AnimatedSvgEdge } from "@/registry/components/animated-svg-edge";

const AnimatedSvgEdgeDemo = memo((props: EdgeProps) => {
  const staticProps = {
    duration: 2,
    direction: "forward",
    path: "bezier",
    repeat: "indefinite",
    shape: "package",
  } as const;

  return <AnimatedSvgEdge {...props} data={staticProps} />;
});

export default AnimatedSvgEdgeDemo;
