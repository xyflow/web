import { useEffect, useState } from 'react';
import { CodeViewer, CodeViewerProps } from 'xy-shared';

type ExampleViewerProps = CodeViewerProps & {
  codePath: string;
  additionalFiles?: string[];
  activeFile?: string;
  isTypescript: boolean;
  editorHeight: string;
  orientation?: 'horizontal' | 'vertical';
};

export default function ExampleViewer({
  codePath,
  additionalFiles = [],
  activeFile,
  isTypescript,
  editorHeight,
  dependencies = {},
  orientation = 'horizontal',
  ...rest
}: ExampleViewerProps) {
  const [files, setFiles] = useState(null);
  const scriptExtension = isTypescript
    ? 'tsx'
    : codePath.includes('example-flows')
      ? 'jsx'
      : 'js';
  // sandpack does not support using .jsx extension with the react template
  const sandpackExtension = scriptExtension === 'jsx' ? 'js' : scriptExtension;
  const dependenciesWithDefault = {
    '@xyflow/react': process.env.REACT_FLOW_VERSION,
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
        [`/App.${sandpackExtension}`]: files.default,
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
      editorHeight={editorHeight}
      orientation={orientation}
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
