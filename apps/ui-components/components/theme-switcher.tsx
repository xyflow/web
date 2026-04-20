"use client";

import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ColorMode = "light" | "dark" | "system";

function applyColorMode(mode: ColorMode) {
  const isDark =
    mode === "dark" ||
    (mode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.querySelectorAll(".react-flow").forEach((el) => {
    el.classList.toggle("dark", isDark);
  });
}

export default function ThemeSwitcher() {
  const [colorMode, setColorMode] = useState<ColorMode>("system");
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;

    applyColorMode(colorMode);

    if (colorMode === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyColorMode("system");
      mq.addEventListener("change", handler);
      cleanupRef.current = () => mq.removeEventListener("change", handler);
    }

    return () => {
      cleanupRef.current?.();
    };
  }, [colorMode]);

  return (
    <div className="absolute top-4 right-4 z-10">
      <Select
        value={colorMode}
        onValueChange={(v) => setColorMode(v as ColorMode)}
      >
        <SelectTrigger className="bg-primary-foreground w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
