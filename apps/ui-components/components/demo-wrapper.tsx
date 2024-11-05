import { PropsWithChildren } from "react";
import ThemeSwitcher from "./theme-switcher";
import { ReactFlowProvider } from "@xyflow/react";

export default function DemoWrapper(props: PropsWithChildren) {
  return (
    <ReactFlowProvider>
      <ThemeSwitcher />
      {props.children}
    </ReactFlowProvider>
  );
}
