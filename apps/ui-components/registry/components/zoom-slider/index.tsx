"use client";

import React, { forwardRef } from "react";
import { Maximize, Minus, Plus } from "lucide-react";

import {
  Panel,
  useViewport,
  useStore,
  useReactFlow,
  type PanelProps,
} from "@xyflow/react";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ZoomSlider = forwardRef<
  HTMLDivElement,
  Omit<PanelProps, "children"> & {
    orientation?: React.AriaAttributes["aria-orientation"];
  }
>(({ className, orientation = "vertical", ...props }, ref) => {
  const { zoom } = useViewport();
  const { zoomTo, zoomIn, zoomOut, fitView } = useReactFlow();
  const minZoom = useStore((state) => state.minZoom);
  const maxZoom = useStore((state) => state.maxZoom);

  return (
    <Panel
      className={cn(
        "flex gap-1 rounded-md bg-primary-foreground p-1 text-foreground",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
      ref={ref}
      {...props}
    >
      <div
        className={cn(
          "flex gap-1",
          orientation === "horizontal" ? "flex-row" : "flex-col-reverse",
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => zoomOut({ duration: 300 })}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Slider
          className={cn(
            orientation === "horizontal" ? "w-[140px]" : "h-[140px]",
          )}
          orientation={orientation}
          value={[zoom]}
          min={minZoom}
          max={maxZoom}
          step={0.01}
          onValueChange={(values) => zoomTo(values[0])}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => zoomIn({ duration: 300 })}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        className={cn(
          "tabular-nums",
          orientation === "horizontal"
            ? "w-[140px] min-w-10"
            : "h-[40px] w-[40px]",
        )}
        variant="ghost"
        onClick={() => zoomTo(1, { duration: 300 })}
      >
        {(100 * zoom).toFixed(0)}%
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => fitView({ duration: 300 })}
      >
        <Maximize className="h-4 w-4" />
      </Button>
    </Panel>
  );
});

ZoomSlider.displayName = "ZoomSlider";
