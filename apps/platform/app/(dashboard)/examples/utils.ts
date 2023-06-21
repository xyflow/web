import fs from 'fs';
import path from 'path';

const examplesPath = path.join(process.cwd(), 'pro-examples/packages/pro-examples/src');

export const getExamples = async () => {
  let examples: string[] = [];

  try {
    examples = fs.readdirSync(examplesPath);
  } catch (err) {
    console.log(err);
  }

  return examples;
};
