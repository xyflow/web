import fs from 'fs';
import path from 'path';

import type { ProCodeViewerProps } from 'components/ProExampleViewer';

const getExamplePath = (exampleId: string): string => {
  return path.join(process.cwd(), `pro-examples/examples/src/${exampleId}`);
};

export const getExampleFiles = (exampleId: string): ProCodeViewerProps['files'] => {
  const examplesPath = getExamplePath(exampleId);

  let files: ProCodeViewerProps['files'] = {};

  try {
    const fileNames = fs.readdirSync(examplesPath);

    // @todo this should run recursively and include folders
    fileNames.forEach((file) => {
      const filePath = path.join(examplesPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      files[file] = fileContent;
    });
  } catch (err) {
    console.log(err);
  }

  return files;
};

export const getReadme = (exampleId: string): string => {
  const examplesPath = getExamplePath(exampleId);
  const readmePath = path.join(examplesPath, 'README.mdx');

  try {
    return fs.readFileSync(readmePath, 'utf8');
  } catch (err) {
    console.log(err);
    return '';
  }
};
