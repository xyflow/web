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

import { REACT_FLOW_VERSION, SVELTE_EXAMPLES_URL } from '@/constants';
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

const defaultOptions = {
  editorHeight: '70vh',
  editorWidthPercentage: 45,
  wrapContent: true,
  readOnly: false,
};

type CodeViewerProps = {
  dependencies?: Record<string, string>;
  options?: typeof defaultOptions;
  activeFile?: string;
  showEditor?: boolean;
  showPreview?: boolean;
  isTypescript?: boolean;
  customPreview?: React.ReactNode;
  sandpackOptions?: Record<string, any>;
  showOpenInCodeSandbox?: boolean;
  framework?: Framework;
  files?: SandpackFiles;
  editorHeight?: string | number;
  codePath: string;
};

const defaultSetup = {
  dependencies: {
    reactflow: REACT_FLOW_VERSION,
  },
};

export default function CodeViewer({
  dependencies = {},
  showEditor = true,
  showPreview = true,
  isTypescript = false,
  customPreview = null,
  sandpackOptions = {},
  showOpenInCodeSandbox = true,
  files = {},
  editorHeight = '70vh',
  framework,
  codePath,
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

  const panelStyle = { height: editorHeight };
  sandpackOptions.readOnly = !!customPreview;

  console.log(files);

  return (
    <div className="my-4" style={{ minHeight: editorHeight }}>
      <SandpackProvider
        template={
          framework === 'react' && isTypescript ? 'react-ts' : framework
        }
        options={sandpackOptions}
        customSetup={customSetup}
        files={files}
      >
        <SandpackLayout>
          {showEditor && <SandpackCodeEditor style={panelStyle} />}
          {framework === 'react' && (
            <>
              {showPreview && customPreview ? (
                <>
                  <SandpackStack style={{ flex: '1 1 0%' }}>
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
                        <OpenInCodeSandboxButton />
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
            </>
          )}
          {framework === 'svelte' && (
            <iframe
              src={`${SVELTE_EXAMPLES_URL}${codePath}`}
              width="100%"
              height="500px"
            ></iframe>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
