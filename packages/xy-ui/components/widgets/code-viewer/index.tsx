'use client';

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackStack,
  OpenInCodeSandboxButton,
  SandpackFiles,
} from '@codesandbox/sandpack-react';
import { Framework } from '../../../types';

const hiddenBaseStyles = {
  '/styles.css': {
    code: `
html, body, #root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
`,
    hidden: true,
  },
};

const defaultOptions = {
  editorHeight: '70vh',
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
  framework = 'react',
  dependencies = {},
  showEditor = true,
  showPreview = true,
  isTypescript = false,
  customPreview = null,
  customOpenButton = null,
  sandpackOptions = {},
  showOpenInCodeSandbox = true,
  files = {},
  editorHeight = '70vh',
  readOnly = false,
}: CodeViewerProps) {
  const panelStyle = { height: editorHeight };
  sandpackOptions.readOnly = !!customPreview;

  return (
    <div className="my-4" style={{ minHeight: editorHeight }}>
      <SandpackProvider
        template={
          framework === 'react' && isTypescript ? 'react-ts' : framework
        }
        options={sandpackOptions}
        customSetup={{ dependencies }}
        files={{
          ...files,
          ...hiddenBaseStyles,
        }}
      >
        <SandpackLayout>
          {showEditor && (
            <SandpackCodeEditor readOnly={readOnly} style={panelStyle} />
          )}
          {showPreview && customPreview ? (
            <>
              <SandpackStack style={{ flex: '1 1 0%', height: editorHeight }}>
                <div
                  className="sp-preview-container"
                  style={{ flex: '1 1 0%', height: '100%' }}
                >
                  {customPreview}
                  <div
                    className="sp-preview-actions"
                    style={{
                      zIndex: 10,
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                    }}
                  >
                    {showOpenInCodeSandbox && !customOpenButton && (
                      <OpenInCodeSandboxButton />
                    )}
                    {customOpenButton}
                  </div>
                </div>
              </SandpackStack>
            </>
          ) : (
            <SandpackPreview
              style={panelStyle}
              showOpenInCodeSandbox={showOpenInCodeSandbox}
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
