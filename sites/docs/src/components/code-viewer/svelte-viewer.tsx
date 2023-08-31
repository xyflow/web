import React, { useEffect, useRef } from 'react';
import sdk from '@stackblitz/sdk';
import { SandpackFiles } from '@codesandbox/sandpack-react';

import SvelteSetup from './svelte/setup';

export default function SvelteViewer({
  files,
  editorHeight = '70vh',
}: {
  files: SandpackFiles;
  editorHeight?: number | string;
}) {
  const embedRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!embedRef.current || initialized.current) {
      return;
    }

    const initializeEmbed = async () => {
      const stackblitzFiles = Object.entries(files).reduce(
        (acc, [key, value]) => {
          acc[key] = typeof value === 'string' ? value : value.code;
          return acc;
        },
        {}
      );

      await sdk.embedProject(
        embedRef.current,
        {
          files: {
            ...SvelteSetup,
            ...stackblitzFiles,
          },
          title: 'Svelte',
          template: 'node',
        },
        {
          theme: 'light',
          hideDevTools: true,
          terminalHeight: 0,
          hideNavigation: true,
          view: 'preview',
          openFile: 'src/App.svelte',
          height: editorHeight,
        }
      );
    };

    initializeEmbed();
    initialized.current = true;
  }, []);

  return (
    <div>
      <div ref={embedRef} />
    </div>
  );
}
