import { useEffect, useState } from 'react';
import ReactViewer from './react-viewer';
import AgnosticViewer from './agnostic-viewer';

import { Framework } from '@/types';
import { getScriptExtension } from './utils';
import { SVELTE_EXAMPLES_URL } from '@/constants';

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
};

export default function CodeViewer({
  codePath,
  additionalFiles = [],
  options = defaultOptions,
  activeFile = null,
  isTypescript = false,
  framework = 'react',
  ...rest
}: CodeViewerProps) {
  const [files, setFiles] = useState(null);
  const scriptExtension = getScriptExtension({ framework, isTypescript });

  useEffect(() => {
    const loadLocalFiles = async () => {
      const res = await import(
        `!raw-loader!./${codePath}/index.${scriptExtension}`
      );

      const additional = {};

      for (let additionalFile of additionalFiles) {
        if (typeof additionalFile === 'string') {
          const file = await import(
            `!raw-loader!./${codePath}/${additionalFile}`
          );
          additional[`/${additionalFile}`] = {
            code: file.default,
          };

          if (additionalFile === activeFile) {
            additional[`/${additionalFile}`].active = true;
          }
        } else {
          const fileName = Object.keys(additionalFile)[0];
          additional[`/${fileName}`] = additionalFile[fileName];
        }
      }

      setFiles({
        [`/App.${scriptExtension}`]: res.default,
        ...additional,
      });
    };

    async function loadFilesSvelte() {
      const response = await fetch(`${SVELTE_EXAMPLES_URL}${codePath}`, {
        method: 'POST',
      });

      if (response.ok) {
        const files = await response.json();
        setFiles(files);
      }
    }

    if (framework === 'svelte') {
      loadFilesSvelte();
    } else {
      loadLocalFiles();
    }
  }, []);

  const editorHeight = options?.editorHeight || '70vh';

  if (!files) {
    return <div style={{ minHeight: editorHeight }} />;
  }

  return framework === 'svelte' ? (
    <AgnosticViewer
      files={files}
      editorHeight={editorHeight}
      framework={framework}
      codePath={codePath}
      {...rest}
    />
  ) : (
    <ReactViewer files={files} editorHeight={editorHeight} {...rest} />
  );
}
