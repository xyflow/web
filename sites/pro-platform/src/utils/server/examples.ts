import fs from 'fs';
import path from 'path';

import { SandpackFiles } from '@codesandbox/sandpack-react/types';
import type { ProCodeViewerProps } from '@/components/ProExampleViewer';

export enum Framework {
  REACT = 'react',
}

export type ExampleConfig = {
  name: string;
  description: string;
  hidden?: boolean;
};

export type Example = {
  id: string;
  files?: SandpackFiles;
  directory: string;
  framework: Framework;
  // @todo type example config
  // config: Record<string, any>;
} & ExampleConfig;

export type GetExampleOptions = {
  includeFiles?: boolean;
};

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

export const getExampleConfig = (frameworkId: Framework, exampleId: string): ExampleConfig | undefined => {
  const examplesPath = getExamplePath(frameworkId, exampleId);

  try {
    const configJson = fs.readFileSync(path.join(examplesPath, 'config.json'), 'utf8');
    return JSON.parse(configJson);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getExample = (
  frameworkId: Framework,
  exampleId: string,
  { includeFiles = false }: GetExampleOptions = {}
): Example => {
  const examplePath = getExamplePath(frameworkId, exampleId);
  const exampleFiles = includeFiles ? getExampleFiles(frameworkId, exampleId) : undefined;
  const exampleConfig = getExampleConfig(frameworkId, exampleId);

  return {
    id: exampleId,
    directory: examplePath,
    framework: frameworkId,
    ...exampleConfig,
    files: exampleFiles,
  };
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

export const getExamples = ({ includeFiles = false }: GetExampleOptions = {}): Record<Framework, Example[]> => {
  return Object.values(Framework).reduce<Record<Framework, Example[]>>(
    (result, frameworkId) => {
      const exampleIds = getExampleIds(frameworkId);

      exampleIds.forEach((exampleId) => {
        result[frameworkId].push(getExample(frameworkId, exampleId, { includeFiles }));
      });

      return result;
    },
    { [Framework.REACT]: [] }
  );
};
