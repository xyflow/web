'use client';

import {
  SandpackProvider,
  UnstyledOpenInCodeSandboxButton,
} from '@codesandbox/sandpack-react';
import { type MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import { Framework, TooltipSimple } from '@xyflow/xy-ui';

import { fetchFiles } from './fetchFiles';

type OpenInCodesandboxProps = {
  framework: Framework;
  route: string;
};

type Files = {
  [path: string]: {
    code: string;
  };
};

type Dependencies = Record<string, string>;

export function OpenInCodesandbox({ framework, route }: OpenInCodesandboxProps) {
  const [mountReroute, setMountReroute] = useState<null | {
    files: Files;
    dependencies: Dependencies;
  }>(null);

  const openInCodesandbox = useCallback(async () => {
    try {
      const { files, dependencies } = await fetchFiles(route, framework);

      setMountReroute({ files, dependencies });
    } catch (e) {}
  }, [framework, route]);

  return (
    <>
      {/* When the files & dependencies are loader we mount the Sandpack provider
          with it */}
      {mountReroute && (
        <SandpackProvider
          template={framework === 'react' ? 'vite-react-ts' : 'vite-svelte-ts'}
          customSetup={{
            dependencies: mountReroute.dependencies,
            entry: 'index.html',
          }}
          files={mountReroute.files}
        >
          {/* Inside we mount a component that will access the context created by the provider  */}
          <VirtualCodeSandboxButton />
        </SandpackProvider>
      )}
      <TooltipSimple label="Open in CodeSandbox">
        <button title="Open in CodeSandbox" onClick={openInCodesandbox}>
          <svg className="size-4 fill-slate-700 stroke-slate-700" viewBox="0 0 1024 1024">
            <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"></path>
          </svg>
        </button>
      </TooltipSimple>
    </>
  );
}

function VirtualCodeSandboxButton() {
  const codesandboxInitiated = useRef(false);

  useEffect(() => {
    codesandboxInitiated.current = true;
  }, []);

  // all the relevant logic for creating the sandbox is inside the UnstyledOpenInCodeSandboxButton component
  // there is even a 600ms delay implemented in the source code, which I am not in the position to question.
  // https://github.com/codesandbox/sandpack/blob/8716a577694885b53e0696a275ecbf0b87097fc1/sandpack-react/src/components/common/OpenInCodeSandboxButton/UnstyledOpenInCodeSandboxButton.tsx#L112
  return (
    <UnstyledOpenInCodeSandboxButton>
      <RerouteToCodeSandbox codesandboxInitiated={codesandboxInitiated} />
    </UnstyledOpenInCodeSandboxButton>
  );
}

function RerouteToCodeSandbox({
  codesandboxInitiated,
}: {
  codesandboxInitiated: MutableRefObject<boolean>;
}) {
  return (
    <span
      ref={(ref) => {
        // This component waits to be rerendered after the parent component has mounted.
        // It should only rerender once the url of the sandbox is determined.
        if (codesandboxInitiated.current && ref) {
          ref.click();
        }
      }}
    ></span>
  );
}
