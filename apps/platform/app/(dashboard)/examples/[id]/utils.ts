import fs from 'fs';
import path from 'path';

export type ExampleFile = {
  name: string;
  content: string;
};

export const getExampleFiles = (exampleId: string): ExampleFile[] => {
  const examplesPath = path.join(process.cwd(), `pro-examples/examples/src/${exampleId}`);

  let files: ExampleFile[] = [];

  try {
    const fileNames = fs.readdirSync(examplesPath);

    // @todo this should run recursively and include folders
    files = fileNames.map((file) => {
      const filePath = path.join(examplesPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      return {
        name: file,
        content: fileContent,
      };
    });
  } catch (err) {
    console.log(err);
  }

  return files;
};
