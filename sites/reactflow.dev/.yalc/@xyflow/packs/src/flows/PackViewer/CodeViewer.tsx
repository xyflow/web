"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  type SandpackFiles,
} from "@codesandbox/sandpack-react";

import { aquaBlue } from "@codesandbox/sandpack-themes";

type Framework = "react" | "svelte";

const defaultOptions = {
  editorHeight: "70vh",
  editorWidthPercentage: 45,
  wrapContent: true,
  readOnly: false,
};

export type CodeViewerProps = {
  dependencies?: Record<string, string>;
  options?: typeof defaultOptions;
  activeFile?: string;
  showEditor?: boolean;
  showPreview?: boolean;
  isTypescript?: boolean;
  customPreview?: React.ReactNode;
  customOpenButton?: React.ReactNode;
  sandpackOptions?: Record<string, any>;
  showOpenInCodeSandbox?: boolean;
  framework?: Framework;
  files?: SandpackFiles;
  editorHeight?: string | number;
  readOnly?: boolean;
};

export function CodeViewer({
  framework = "react",
  dependencies = {},
  showEditor = true,
  isTypescript = false,
  customPreview = null,
  sandpackOptions = {},
  files = {},
  editorHeight = "70vh",
  readOnly = false,
  activeFile,
}: CodeViewerProps) {
  const panelStyle = { maxHeight: editorHeight };
  sandpackOptions.readOnly = !!customPreview;
  // @ todo refactor this. activeFile should be passed separately or within the sandpackOptions
  sandpackOptions.activeFile = sandpackOptions.activeFile || activeFile;

  return (
    <div className="my-4">
      <SandpackProvider
        theme={aquaBlue}
        template={
          framework === "react" && isTypescript ? "react-ts" : framework
        }
        options={sandpackOptions}
        customSetup={{ dependencies }}
        files={files}
      >
        <SandpackLayout>
          {showEditor && (
            <SandpackCodeEditor
              readOnly={readOnly}
              style={panelStyle}
              showLineNumbers
              wrapContent
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
