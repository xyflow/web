"use client";

import * as React from "react";
import { Maximize, Minus, Plus } from "lucide-react";

import {
  Panel,
  useViewport,
  useStore,
  useReactFlow,
  PanelProps,
} from "@xyflow/react";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ZoomSlider = React.forwardRef<
  HTMLButtonElement,
  Omit<PanelProps, "children">
>(({ className, ...props }, ref) => {
  const { zoom } = useViewport();
  const { zoomTo, zoomIn, zoomOut, fitView } = useReactFlow();

  const { minZoom, maxZoom } = useStore(
    (state) => ({
      minZoom: state.minZoom,
      maxZoom: state.maxZoom,
    }),
    (a, b) => a.minZoom !== b.minZoom || a.maxZoom !== b.maxZoom,
  );

  // @todo do we need to wrap these with useCallback?
  const onValueChange = (value: number[]) => {
    zoomTo(value[0]);
  };

  const onZoomInButton = () => {
    zoomIn({ duration: 300 });
  };

  const onZoomOutButton = () => {
    zoomOut({ duration: 300 });
  };

  const onZoomInitButton = () => {
    zoomTo(1, { duration: 300 });
  };

  const onFitViewButton = () => {
    fitView({ duration: 300 });
  };

  // @todo forward ref here, not possible atm because panel doesn't accept ref as prop
  return (
    <Panel
      className={cn("flex bg-primary-foreground text-foreground", className)}
      {...props}
    >
      <Button variant="ghost" size="icon" onClick={onZoomOutButton}>
        <Minus className="h-4 w-4" />
      </Button>
      <Slider
        className="w-[140px]"
        value={[zoom]}
        min={minZoom}
        max={maxZoom}
        step={0.01}
        onValueChange={onValueChange}
      />
      <Button variant="ghost" size="icon" onClick={onZoomInButton}>
        <Plus className="h-4 w-4" />
      </Button>
      <Button
        className="min-w-20 tabular-nums"
        variant="ghost"
        onClick={onZoomInitButton}
      >
        {(100 * zoom).toFixed(0)}%
      </Button>
      <Button variant="ghost" size="icon" onClick={onFitViewButton}>
        <Maximize className="h-4 w-4" />
      </Button>
    </Panel>
  );
});

ZoomSlider.displayName = "ZoomSlider";

export { ZoomSlider };
