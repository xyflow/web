import { EdgeLabelRenderer, useStore, type NodeProps } from "reactflow";
import * as HoverCard from "@radix-ui/react-hover-card";

import css from "./multiverse.module.css";
import clsx from "clsx";

type wrapNode = (
  Component: React.ComponentType<NodeProps>,
  onNodeClick: (node: string, nodeId: string) => void,
) => React.ComponentType<NodeProps>;

const wrapNode: wrapNode = (Component, onNodeClick) => (props) => {
  const reactFlowDomNode = useStore((state) => state.domNode);
  return (
    <HoverCard.Root openDelay={0} closeDelay={0}>
      <EdgeLabelRenderer>
        <HoverCard.Content
          side="top"
          sideOffset={20}
          collisionBoundary={reactFlowDomNode}
        >
          <div className={css.tooltip}>{props.type}</div>
          <HoverCard.Arrow className={"fill-tooltip-bg [fill-opacity:0.8]"} />
        </HoverCard.Content>
      </EdgeLabelRenderer>
      <HoverCard.Trigger asChild>
        <div
          className={clsx(css.nodeHighlightBox, "cursor-pointer")}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onNodeClick(props.type, props.id);
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {/* FIXME Not really sure about the double div wrapper to prevent user interaction 💩 */}
          <div style={{ pointerEvents: "none" }}>
            <Component {...props} />
          </div>
        </div>
      </HoverCard.Trigger>
    </HoverCard.Root>
  );
};

export default wrapNode;
