import { useEffect, useRef, useState } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import {
  useStore,
  useReactFlow,
  type EdgeProps,
  type ReactFlowInstance,
  EdgeLabelRenderer,
} from "reactflow";

import css from "./multiverse.module.css";
import { getPathBoundingBox } from "./utils";

const PADDING = 20;

type wrapEdge = (
  Component: React.ComponentType<EdgeProps>,
  onEdgeClick: (edge: string, edgeId: string) => void,
) => React.ComponentType<EdgeProps>;

const wrapEdge: wrapEdge = (Component, onEdgeClick) => (props) => {
  const reactFlowInstance = useReactFlow();
  const reactFlowDomNode = useStore((state) => state.domNode);

  const group = useRef<SVGGElement>(null);

  const [hover, setHover] = useState(false);
  const [pathBB, setPathBB] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (group.current) {
      const path = group.current.firstChild as SVGElement;

      // set initial path bounding box
      const newPathBBox = getPathBoundingBox(path, reactFlowInstance);
      setPathBB(newPathBBox);

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // set new path bounding box when 'd' changes
          if (mutation.attributeName === "d") {
            const newPathBBox = getPathBoundingBox(path, reactFlowInstance);
            setPathBB(newPathBBox);
          }
        });
      });

      observer.observe(path, { attributes: true });
    }
  }, []);

  return (
    <g
      className="[pointer-events:bounding-box]"
      ref={group}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <g className="pointer-events-none">
        <Component {...props} />
      </g>
      <HoverCard.Root open={hover}>
        <EdgeLabelRenderer>
          <HoverCard.Content
            side="top"
            sideOffset={5}
            // z-index needs to be higher than 1000 to be above selected nodes
            style={{ zIndex: 1001 }}
            collisionBoundary={reactFlowDomNode}
          >
            <div className={css.tooltip}>
              {/* FIXME: type not part of edge props so props.data workaround used */}
              {props.data.title}
            </div>
            <HoverCard.Arrow className="fill-tooltip-bg [fill-opacity:0.8]" />
          </HoverCard.Content>
        </EdgeLabelRenderer>
        <EdgeLabelRenderer>
          <HoverCard.Trigger asChild>
            <div
              onClick={(e) => {
                e.stopPropagation();
                onEdgeClick(props.data.title, props.id);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              className={css.edgeHighlightBox}
              style={{
                visibility: hover ? "visible" : "hidden",
                width: pathBB.width + PADDING * 2,
                height: pathBB.height + PADDING * 2,
                transform: `translate(${pathBB.x - PADDING}px, 
                  ${pathBB.y - PADDING}px)`,
              }}
            />
          </HoverCard.Trigger>
        </EdgeLabelRenderer>
      </HoverCard.Root>
    </g>
  );
};

export default wrapEdge;
