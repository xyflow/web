import { useEffect, useState } from 'react';
import { CodeViewer, CodeViewerProps } from 'xy-shared';

type ExampleViewerProps = CodeViewerProps & {
  codePath: string;
  additionalFiles?: string[];
  activeFile?: string;
  isTypescript: boolean;
  editorHeight: string;
};

export default function ExampleViewer({
  codePath,
  additionalFiles = [],
  activeFile,
  isTypescript,
  editorHeight,
  dependencies = {},
  ...rest
}: ExampleViewerProps) {
  const [files, setFiles] = useState(null);
  const scriptExtension = isTypescript ? 'tsx' : 'js';
  const dependenciesWithDefault = {
    reactflow: process.env.NEXT_PUBLIC_REACT_FLOW_VERSION,
    ...dependencies,
  };

  useEffect(() => {
    const loadFiles = async () => {
      const files = await loadLocalFiles(
        codePath,
        scriptExtension,
        additionalFiles,
        activeFile,
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
    <CodeViewer
      files={files}
      activeFile={activeFile}
      framework="react"
      isTypescript={isTypescript}
      dependencies={dependenciesWithDefault}
      {...rest}
    />
  );
}

async function loadLocalFiles(
  codePath: string,
  scriptExtension: string,
  additionalFiles?: string[],
  activeFile?: string,
) {
  const res = await import(
    `!raw-loader!./${codePath}/index.${scriptExtension}`
  );

  const additional = {};

  for (let additionalFile of additionalFiles) {
    if (typeof additionalFile === 'string') {
      const file = await import(`!raw-loader!./${codePath}/${additionalFile}`);
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

  return { default: res.default, additional };
}
