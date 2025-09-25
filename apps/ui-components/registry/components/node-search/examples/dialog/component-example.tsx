import { Panel } from "@xyflow/react";
import { NodeSearchDialog } from "@/registry/components/node-search";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function NodeSearchDialogExample() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Panel position="top-left">
        <Button onClick={() => setOpen(true)} variant="outline">
          <p> Click here or press Ctrl/Cmd+K to open the Node Search dialog </p>
        </Button>
      </Panel>
      <NodeSearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
