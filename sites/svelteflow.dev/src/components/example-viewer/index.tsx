import { useEffect, useState } from 'react';
import sdk from '@stackblitz/sdk';
import { Button } from '@xyflow/xy-ui';
import { CodeViewer } from 'xy-shared';

import setup from './setup';
import IframePreview from './iframe-preview';

type SvelteExampleProps = {
  codePath: string;
  activeFile?: string;
  editorHeight: number | string;
  dependencies?: { [key: string]: string };
  tailwind?: boolean;
};

export default function SvelteExample({
  codePath,
  editorHeight = '70vh',
  activeFile,
  dependencies = {},
  tailwind = false,
  ...rest
}: SvelteExampleProps) {
  const [files, setFiles] = useState<{ [key: string]: string }>(null);
  const [fileFetchFailed, setFileFetchFailed] = useState(false);

  function openInStackblitz() {
    const svelteSetup = setup({
      dependencies: tailwind
        ? {
            ...dependencies,
            tailwindcss: 'latest',
            postcss: 'latest',
            autoprefixer: 'latest',
          }
        : dependencies,
      tailwind,
    });
    // rename files to land in folder src/example/ on stackblitz
    const stackblitzFiles = Object.entries(files).reduce(
      (filesAcc: { [key: string]: string }, [fileName, file]) => {
        const newFileName = `src/example/${fileName}`;
        filesAcc[newFileName] = file;

        return filesAcc;
      },
      {},
    );

    sdk.openProject(
      {
        title: 'Svelte Example',
        files: {
          ...svelteSetup,
          ...stackblitzFiles,
        },
        template: 'node',
      },
      {
        openFile: activeFile
          ? `src/example/${activeFile}`
          : 'src/example/App.svelte',
      },
    );
  }

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SVELTE_EXAMPLES_URL}${codePath}`,
          {
            method: 'POST',
          },
        );

        if (response.ok) {
          const files = await response.json();
          setFiles(files);
        } else {
          setFileFetchFailed(true);
        }
      } catch {
        setFileFetchFailed(true);
      }
    }

    fetchFiles();
  }, []);

  if (!files && fileFetchFailed) {
    return (
      <div
        style={{ height: editorHeight }}
        className={`w-full color nx-bg-primary-100 flex justify-center content-center flex-wrap`}
      >
        <p className="text-svelte">Example failed to load</p>
      </div>
    );
  }

  return (
    <CodeViewer
      files={files ? files : { 'App.svelte': 'Loading...' }}
      editorHeight={editorHeight}
      showOpenInCodeSandbox={false}
      framework="svelte"
      readOnly
      activeFile={activeFile}
      customPreview={<IframePreview path={codePath} className="example" />}
      customOpenButton={
        <Button
          onClick={openInStackblitz}
          size="sm"
          className="font-medium text-[10px] h-6 bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          Open in Stackblitz
        </Button>
      }
      {...rest}
    />
  );
}
