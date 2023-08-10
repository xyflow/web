import { useEffect, useState, useMemo } from 'react';
import ReactViewer from './react-viewer';
import SvelteViewer from './svelte-viewer';

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
    const loadFiles = async () => {
      const res = await import(
        `!raw-loader!./${codePath}/index.${scriptExtension}`
      );

      const pathPrefix = framework === 'svelte' ? 'src' : '';

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

    loadFiles();
  }, []);

  const editorHeight = options?.editorHeight || '70vh';

  if (!files) {
    return <div style={{ minHeight: editorHeight }} />;
  }

  return framework === 'svelte' ? (
    <SvelteViewer files={files} editorHeight={editorHeight} />
  ) : (
    <ReactViewer files={files} editorHeight={editorHeight} {...rest} />
  );
}
