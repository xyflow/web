import fs from 'fs';
import { join } from 'path';

export async function getMarkdown(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(join(process.cwd(), filePath), (err, content) => {
      if (err) {
        return reject(err);
      }

      resolve(content);
    });
  });
}
