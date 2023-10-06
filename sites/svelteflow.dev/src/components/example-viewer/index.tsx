import { useEffect, useState } from 'react';
import sdk from '@stackblitz/sdk';

import { Button, CodeViewer } from 'xy-ui';
import SvelteSetup from './setup'

import { SVELTE_EXAMPLES_URL } from '@/constants';

type SvelteExampleProps = {
  codePath: string;
  activeFile?: string;
  editorHeight: number | string;
};

export default function SvelteExample({
  codePath,
  editorHeight,
  activeFile,
  ...rest
}: SvelteExampleProps) {
  const [files, setFiles] = useState<{ [key: string]: string }>(null);
  const [fileFetchFailed, setFileFetchFailed] = useState(false);

  function openInStackblitz() {
    // rename files to land in folder src/example/ on stackblitz
    const stackblitzFiles = Object.entries(files).reduce(
      (filesAcc: { [key: string]: string }, [fileName, file]) => {
        const newFileName = `src/example/${fileName}`;
        filesAcc[newFileName] = file;

        return filesAcc;
      },
      {}
    );

    sdk.openProject(
      {
        title: 'Svelte Example',
        files: {
          ...SvelteSetup,
          ...stackblitzFiles,
        },
        template: 'node',
      },
      {
        openFile: activeFile
          ? `src/example/${activeFile}`
          : 'src/example/App.svelte',
      }
    );
  }

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch(`${SVELTE_EXAMPLES_URL}${codePath}`, {
          method: 'POST',
        });

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

  if (!files) {
    return (
      <>
        {fileFetchFailed && (
          <div
            style={{ height: editorHeight }}
            className="w-full color nx-bg-primary-100 flex justify-center content-center flex-wrap"
          >
            <p className="text-svelte">Example failed to load</p>
          </div>
        )}
      </>
    );
  }

  return (
    <CodeViewer
      files={files}
      editorHeight={editorHeight}
      showOpenInCodeSandbox={false}
      framework="svelte"
      readOnly
      customPreview={
        <iframe
          src={`${SVELTE_EXAMPLES_URL}${codePath}`}
          width="100%"
          height="100%"
        />
      }
      customOpenButton={
        <Button onClick={openInStackblitz}>Open in Stackblitz</Button>
      }
      {...rest}
    />
  );
}
