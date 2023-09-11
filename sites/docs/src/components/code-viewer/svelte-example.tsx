import { useEffect, useState } from 'react';
import sdk from '@stackblitz/sdk';

import { Button } from 'xy-ui';
import ExampleViewer from './example-viewer';
import SvelteSetup from './svelte/setup';

import { Framework } from '@/types';
import { SVELTE_EXAMPLES_URL } from '@/constants';

type SvelteExampleProps = {
  codePath: string;
  framework?: Framework;
  activeFile?: string;
  editorHeight: string;
};

export default function SvelteExample({
  codePath,
  editorHeight,
  activeFile,
  ...rest
}: SvelteExampleProps) {
  const [files, setFiles] = useState(null);
  const [fileFetchFailed, setFileFetchFailed] = useState(false);

  function openInStackblitz() {
    // rename files to land in folder src/example/ on stackblitz
    const stackblitzFiles = Object.keys(files).reduce(
      (filesAcc: { [key: string]: string }, fileName) => {
        const newFileName = `src/example/${fileName}`;
        filesAcc[newFileName] = files[fileName];

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
            <p
              style={{ color: 'rgb(230, 115, 0)' }}
              className="color-primary-foreground"
            >
              Example failed to load
            </p>
          </div>
        )}
      </>
    );
  }

  return (
    <ExampleViewer
      files={files}
      editorHeight={editorHeight}
      showOpenInCodeSandbox={false}
      readOnly
      customPreview={
        <iframe
          src={`${SVELTE_EXAMPLES_URL}${codePath}`}
          width="100%"
          height={editorHeight}
        />
      }
      customOpenButton={
        <Button onClick={openInStackblitz}>Open in Stackblitz</Button>
      }
      {...rest}
    />
  );
}
