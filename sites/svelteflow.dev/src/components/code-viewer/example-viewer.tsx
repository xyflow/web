import { useMemo } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackStack,
  OpenInCodeSandboxButton,
  SandpackFiles,
} from '@codesandbox/sandpack-react';

import { REACT_FLOW_VERSION } from '@/constants';
import { Framework } from '@/types';

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

export type CodeViewerOptions = {
  editorHeight: string | number;
  editorWidthPercentage: number;
  wrapContent: boolean;
  readOnly: boolean;
};

type CodeViewerProps = {
  dependencies?: Record<string, string>;
  options: CodeViewerOptions;
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
  readOnly?: boolean;
};

const defaultSetup = {
  dependencies: {
    reactflow: REACT_FLOW_VERSION,
  },
};

export default function CodeViewer({
  framework,
  options,
  dependencies = {},
  showEditor = true,
  showPreview = true,
  isTypescript = false,
  customPreview = null,
  customOpenButton = null,
  sandpackOptions = {},
  showOpenInCodeSandbox = true,
  files = {},
  readOnly = false,
}: CodeViewerProps) {
  const customSetup = useMemo(
    () => ({
      ...defaultSetup,
      dependencies: {
        ...defaultSetup.dependencies,
        ...dependencies,
      },
    }),
    []
  );

  const panelStyle = { height: options.editorHeight };
  sandpackOptions.readOnly = !!customPreview;

  return (
    <div className="my-4" style={{ minHeight: options.editorHeight }}>
      <SandpackProvider
        template={
          framework === 'react' && isTypescript ? 'react-ts' : framework
        }
        options={sandpackOptions}
        customSetup={customSetup}
        files={{
          ...files,
          ...hiddenBaseStyles,
        }}
      >
        <SandpackLayout>
          {showEditor && (
            <SandpackCodeEditor
              // fix for <pre> with padding when read-only is set
              className={'[&_pre]:!p-0'}
              readOnly={readOnly}
              style={{ ...panelStyle, padding: 0 }}
            />
          )}
          {showPreview && customPreview ? (
            <>
              <SandpackStack
                style={{ flex: '1 1 0%', height: options.editorHeight }}
              >
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
