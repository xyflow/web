'use client';

import { useMemo } from 'react';
import { Resizable } from 're-resizable';
import { aquaBlue } from '@codesandbox/sandpack-themes';
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackOptions,
  SandpackSetup,
  SandpackFiles,
  SandpackLayout,
} from '@codesandbox/sandpack-react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { isDevelopment } from 'utils/browser';

import mdxComponents from './mdx-components';
import DownloadSandpackButton from './sandpack-downloader';
import FullScreenButton from './fullscreen-button';
import OverviewButton from './overview-button';

export type ProCodeViewerProps = {
  exampleId: string;
  files: SandpackFiles;
  title?: string;
  description?: string;
  dependencies?: SandpackSetup['dependencies'];
  sandpackOptions?: SandpackOptions;
  readme: MDXRemoteSerializeResult;
};

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

const defaultSetup = {
  dependencies: {
    reactflow: '11.4.0',
  },
};

const defaultSandpackOptions = {
  editorHeight: 800,
  editorWidthPercentage: 45,
  wrapContent: false,
};

const resizeRightEnabled = {
  top: false,
  right: true,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

const resizeBottomEnabled = {
  top: false,
  right: false,
  bottom: true,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

export default function ProCodeViewer({
  title,
  description,
  exampleId,
  files,
  readme,
  dependencies,
  sandpackOptions,
}: ProCodeViewerProps) {
  const customSandpackOptions = useMemo(
    () => ({
      ...defaultSandpackOptions,
      ...sandpackOptions,
    }),
    []
  );

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

  const isLargeScreen = true;
  const textDefaultWidth = isLargeScreen ? '1000px' : '55%';

  // @todo fix the layout here and add resizable again
  return (
    <SandpackProvider
      template="react-ts"
      customSetup={customSetup}
      files={{ ...files, ...hiddenBaseStyles }}
      options={customSandpackOptions}
      theme={aquaBlue}
    >
      <div className="relative grid grid-cols-2">
        {/* <Resizable
          defaultSize={{
            width: '300px',
            height: '100%',
          }}
          maxWidth="1000px"
          minWidth="10%"
          enable={resizeRightEnabled}
        > */}
        <div className="pr-4">
          <div>
            <OverviewButton />
            {title && <h1>{title}</h1>}
            {description && <div>{description}</div>}
          </div>
          <div>
            <DownloadSandpackButton fileName={`${exampleId}-example`} />
            <FullScreenButton exampleId={exampleId} />
          </div>
          <div style={{ fontFamily: 'unset' }}>
            <MDXRemote {...readme} components={mdxComponents} />
          </div>
          <div>
            <div>Feedback</div>
            <div>
              We are always trying to improve the quality of the Pro examples and would be happy about your feedback.
              Feel free to reach out at <a href="mailto:info@reactflow.dev">info@reactflow.dev</a>.
            </div>
          </div>
        </div>
        {/* </Resizable> */}
        <div className="bg-red-500 sticky top-0 h-[100vh]">
          <SandpackPreview style={{ height: '50%' }} showOpenInCodeSandbox={isDevelopment()} />
          <SandpackCodeEditor style={{ height: '50%' }} />

          {/* <Resizable
            defaultSize={{
              width: '100%',
              height: '50%',
            }}
            enable={resizeBottomEnabled}
            maxHeight="90%"
            minHeight="10%"
          >
            <div>
              <SandpackPreview showOpenInCodeSandbox={isDevelopment()} />
            </div>
          </Resizable>
          <SandpackCodeEditor
            showRunButton={false}
            style={{ flexGrow: 1, height: '50%' }}
            {...customSandpackOptions}
            // @todo re-enable this
            // readOnly={isReadOnly}
          /> */}
        </div>
      </div>
    </SandpackProvider>
  );
}
