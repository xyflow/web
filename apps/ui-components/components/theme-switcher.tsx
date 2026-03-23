"use client";

import { Panel } from "@xyflow/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ThemeSwitcher() {
  // @todo make this work with system color theme
  const onValueChange = (theme: string) => {
    const rfElement = document.querySelector(".react-flow");
    if (rfElement) {
      rfElement.classList.toggle("dark", theme === "dark");
    }
  };

  return (
    <Panel position="top-right">
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="bg-primary-foreground w-[140px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </Panel>
  );
}
