import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  SandpackProvider,
  UnstyledOpenInCodeSandboxButton,
} from '@codesandbox/sandpack-react';

import { Button, Framework } from '@xyflow/xy-ui';

import { fetchFiles } from './fetchFiles';

type OpenInCodesandboxProps = {
  framework: Framework;
  route: string;
  sandpackOptions?: Record<string, any>;
};

type Files = {
  [path: string]: {
    code: string;
  };
};

type Dependencies = Record<string, string>;

export function OpenInCodesandbox({
  framework,
  route,
  sandpackOptions,
}: OpenInCodesandboxProps) {
  const [mountReroute, setMountReroute] = useState<null | {
    files: Files;
    dependencies: Dependencies;
  }>(null);

  const openInCodesandbox = useCallback(async () => {
    const { files, dependencies } = await fetchFiles(route, framework);

    setMountReroute({ files, dependencies });
  }, [framework, route]);

  return (
    <>
      {/* When the files & dependencies are loader we mount the Sandpack provider
          with it */}
      {mountReroute && (
        <SandpackProvider
          template={framework === 'react' ? 'vite-react-ts' : 'vite-svelte-ts'}
          options={sandpackOptions}
          customSetup={{
            dependencies: mountReroute.dependencies,
            entry: 'index.html',
          }}
          files={mountReroute.files}
        >
          {/* Inside we mount a component that will acess the context created by the provider  */}
          <VirtualCodeSandboxButton />
        </SandpackProvider>
      )}
      <Button
        onClick={openInCodesandbox}
        size="sm"
        className="font-medium text-[10px] h-6 bg-gray-100 hover:bg-gray-200 text-gray-700 ml-2"
      >
        Open in Codesandbox
      </Button>
    </>
  );
}

function VirtualCodeSandboxButton() {
  const codesandboxInitiated = useRef(false);

  useEffect(() => {
    codesandboxInitiated.current = true;
  }, []);

  // all the relevant logic for creating the sandbox is inside
  // the UnstyledOpenInCodeSandboxButton component
  // there is even a 600ms delay implemented in the source code,
  // which I am not in the position to question.
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
        // This component waits to be rerendered
        // after the parent component has mounted.
        // It should only rerender once more when the url of the sandbox is determined.
        if (codesandboxInitiated.current && ref) {
          ref.click();
        }
      }}
    ></span>
  );
}
