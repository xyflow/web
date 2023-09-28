import { useEffect, useState } from 'react';
import ExampleViewer, { CodeViewerOptions } from './example-viewer';
import { getScriptExtension, loadLocalFiles } from './utils';

import { Framework } from '@/types';

type ReactExampleProps = {
  codePath: string;
  additionalFiles: string[];
  framework: Framework;
  isTypescript: boolean;
  options: CodeViewerOptions;
  activeFile?: string;
};

export default function ReactExample({
  codePath,
  additionalFiles,
  activeFile,
  framework,
  isTypescript,
  options,
  ...rest
}: ReactExampleProps) {
  const [files, setFiles] = useState(null);

  const scriptExtension = getScriptExtension({ framework, isTypescript });

  useEffect(() => {
    const loadFiles = async () => {
      const files = await loadLocalFiles(
        codePath,
        scriptExtension,
        additionalFiles,
        activeFile
      );
      setFiles({
        [`/App.${scriptExtension}`]: files.default,
        ...files.additional,
      });
    };

    loadFiles();
  }, []);

  if (!files) {
    return <div style={{ minHeight: options.editorHeight }} />;
  }

  return (
    <ExampleViewer
      files={files}
      activeFile={activeFile}
      framework={framework}
      isTypescript={isTypescript}
      options={options}
      {...rest}
    />
  );
}
