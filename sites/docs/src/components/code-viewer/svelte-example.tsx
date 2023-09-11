import { useEffect, useState } from 'react';
import sdk from '@stackblitz/sdk';

import { Button } from 'xy-ui';
import AgnosticViewer from './agnostic-viewer';
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
    const stackblitzFiles = {};

    // rename files to land in folder src/example/ on stackblitz
    Object.keys(files).forEach((fileName) => {
      const newFileName = `src/example/${fileName}`;
      stackblitzFiles[newFileName] = files[fileName];
    });

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
      <div style={{ minHeight: editorHeight }}>
        {fileFetchFailed && (
          <div
            // style={{ background: 'red', height: editorHeight, color: 'white' }}
            className=""
          >
            Example failed to load.
          </div>
        )}
      </div>
    );
  }

  return (
    <AgnosticViewer
      files={files}
      editorHeight={editorHeight}
      showOpenInCodeSandbox={false}
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
