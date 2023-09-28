import { useEffect, useState } from 'react';
import ExampleViewer from './example-viewer';
import { getScriptExtension, loadLocalFiles } from './utils';

import { Framework } from '@/types';

type ReactExampleProps = {
  codePath: string;
  additionalFiles: string[];
  activeFile?: string;
  framework: Framework;
  isTypescript: boolean;
  editorHeight: string;
};

export default function ReactExample({
  codePath,
  additionalFiles,
  activeFile,
  framework,
  isTypescript,
  editorHeight,
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
    return <div style={{ minHeight: editorHeight }} />;
  }

  return (
    <ExampleViewer
      files={files}
      activeFile={activeFile}
      framework={framework}
      isTypescript={isTypescript}
      {...rest}
    />
  );
}
