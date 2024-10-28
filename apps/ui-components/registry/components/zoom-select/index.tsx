"use client";

import * as React from "react";
import {
  Panel,
  useReactFlow,
  PanelProps,
  useStore,
} from "@xyflow/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from "@/lib/utils";

const ZoomSelect = React.forwardRef<
  HTMLDivElement,
  Omit<PanelProps, "children">
>(({ className, ...props }) => {
  const { zoomTo, fitView } = useReactFlow();

  const handleZoomChange = (value: string) => {
    if (value === "best-fit") {
      fitView();
    } else {
      const zoomValue = parseFloat(value);
      if (!isNaN(zoomValue)) {
        zoomTo(zoomValue);
      } 
    }
  };

  const { minZoom, maxZoom } = useStore(
    (state) => ({
      minZoom: state.minZoom,
      maxZoom: state.maxZoom,
    }),
    (a, b) => a.minZoom !== b.minZoom || a.maxZoom !== b.maxZoom,
  );

  // Increment Zoom Levels between minZoom and maxZoom Value: default 50
  const zoomLevels = [];
  const zoomIncrement = 50;
  for (let i = Math.ceil(minZoom * 100); i <= Math.floor(maxZoom * 100); i += zoomIncrement) {
    zoomLevels.push((i / 100).toString());
  }

  return (
    <Panel
      className={cn("flex bg-primary-foreground text-foreground", className)}
      {...props}
    >
      <Select onValueChange={handleZoomChange}>
        <SelectTrigger className="w-[140px] bg-primary-foreground">
          <SelectValue placeholder="Zoom" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="best-fit">Best Fit</SelectItem>
          <div className="border-t my-1 mx-2" />
          {zoomLevels.map((level) => (
            <SelectItem key={level} value={level}>
              {`${(parseFloat(level) * 100).toFixed(0)}%`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Panel>
  );
});

ZoomSelect.displayName = "ZoomSelect";

export { ZoomSelect };
