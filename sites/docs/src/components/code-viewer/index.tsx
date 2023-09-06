import { useEffect, useState, useMemo } from 'react';
import ReactViewer from './react-viewer';
import SvelteViewer from './svelte-viewer';
import AgnosticViewer from './agnostic-viewer'

import { Framework } from '@/types';
import { getScriptExtension } from './utils';

const defaultOptions = {
  editorHeight: '70vh',
  editorWidthPercentage: 45,
  wrapContent: true,
  readOnly: false,
};

type CodeViewerProps = {
  codePath: string;
  additionalFiles?: string[];
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
  custom_examples?: boolean;
};

export default function CodeViewer({
  codePath,
  additionalFiles = [],
  options = defaultOptions,
  activeFile = null,
  isTypescript = false,
  framework = 'react',
  custom_examples = false,
  ...rest
}: CodeViewerProps) {
  const [files, setFiles] = useState(null);
  const scriptExtension = getScriptExtension({ framework, isTypescript });

  useEffect(() => {
    const loadFiles = async () => {
      // const folder = framework === 'svelte' ? '../../../../../apps/example-viewer-svelte/src/examples' : ''

      const res = await import(
        `!raw-loader!./${codePath}/index.${scriptExtension}`
      );


      // const pathPrefix = framework === 'svelte' ? 'src' : '';
      const pathPrefix = '';

      const additional = {};

      for (let additionalFile of additionalFiles) {
        if (typeof additionalFile === 'string') {
          const file = await import(
            `!raw-loader!./${codePath}/${additionalFile}`
          );
          additional[`${pathPrefix}/${additionalFile}`] = {
            code: file.default,
          };

          if (additionalFile === activeFile) {
            additional[`/${additionalFile}`].active = true;
          }
        } else {
          const fileName = Object.keys(additionalFile)[0];
          additional[`${pathPrefix}/${fileName}`] = additionalFile[fileName];
        }
      }

      setFiles({
        [`${pathPrefix}/App.${scriptExtension}`]: res.default,
        ...additional,
      });
    };

    async function loadFilesCustom() {
      const response = await fetch(`http://localhost:5173/${codePath}`, { method: 'POST' })

      if (response.ok) {
        const files = await response.json()
        setFiles(files)
      }

    }

    if (!custom_examples) {
      loadFiles();
    } else {
      loadFilesCustom();
    }
  }, []);

  const editorHeight = options?.editorHeight || '70vh';

  // console.log(files)

  if (!files) {
    return <div style={{ minHeight: editorHeight }} />;
  }

  return framework === 'svelte' ? (
    <AgnosticViewer files={files} editorHeight={editorHeight} framework={framework} codePath={codePath} custom_examples={custom_examples} {...rest} />
  ) : (
    <ReactViewer files={files} editorHeight={editorHeight} {...rest} />
  );
}
