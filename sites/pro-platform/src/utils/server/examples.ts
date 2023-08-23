import fs from 'fs';
import path from 'path';

import { SandpackFiles } from '@codesandbox/sandpack-react/types';
import type { ProCodeViewerProps } from '@/components/ProExampleViewer';

export enum Framework {
  REACT = 'react',
}

const getExamplesBasePath = (frameworkId: Framework): string => {
  return path.join(process.cwd(), `pro-examples/examples/${frameworkId}/src`);
};

const getExamplePath = (frameworkId: Framework, exampleId: string): string => {
  return path.join(getExamplesBasePath(frameworkId), exampleId);
};

export const getExampleFiles = (frameworkId: Framework, exampleId: string): ProCodeViewerProps['files'] => {
  const examplesPath = getExamplePath(frameworkId, exampleId);

  let files: ProCodeViewerProps['files'] = {};

  try {
    const fileNames = fs.readdirSync(examplesPath);

    // @todo this should run recursively and include folders
    fileNames.forEach((file) => {
      const filePath = path.join(examplesPath, file);

      // @todo handle folders here, too
      if (fs.lstatSync(filePath).isFile()) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        files[file] = fileContent;
      }
    });
  } catch (err) {
    console.log(err);
  }

  return files;
};

export const getReadme = (frameworkId: Framework, exampleId: string): string => {
  const examplesPath = getExamplePath(frameworkId, exampleId);
  const readmePath = path.join(examplesPath, 'README.mdx');

  try {
    return fs.readFileSync(readmePath, 'utf8');
  } catch (err) {
    console.log(err);
    return '';
  }
};

export const getExampleIds = (frameworkId: Framework): string[] => {
  const examplesPath = getExamplesBasePath(frameworkId);

  try {
    return fs.readdirSync(examplesPath);
  } catch (err) {
    console.log(err);
  }

  return [];
};

export type ExampleConfig = {
  name: string;
  description: string;
  hidden?: boolean;
};

export type Example = {
  id: string;
  files: SandpackFiles;
  directory: string;
  framework: Framework;
  // @todo type example config
  // config: Record<string, any>;
} & ExampleConfig;

export const getExamples = (): Record<Framework, Example[]> => {
  return Object.values(Framework).reduce<Record<Framework, Example[]>>(
    (result, frameworkId) => {
      const exampleIds = getExampleIds(frameworkId);

      exampleIds.forEach((exampleId) => {
        const examplePath = getExamplePath(frameworkId, exampleId);
        const exampleFiles = getExampleFiles(frameworkId, exampleId);
        const exampleConfig: ExampleConfig = exampleFiles['config.json']
          ? JSON.parse(exampleFiles['config.json'] as string)
          : {};

        result[frameworkId].push({
          id: exampleId,
          directory: examplePath,
          files: exampleFiles,
          framework: frameworkId,
          ...exampleConfig,
        });
      });

      return result;
    },
    { [Framework.REACT]: [] }
  );
};
