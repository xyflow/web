import { readFileSync } from 'fs';

export function loadJSONFile<T>(url: string): T | undefined {
  try {
    const file = readFileSync(url, 'utf-8');
    return JSON.parse(file.toString()) as T;
  } catch (err) {
    console.log(err);
  }
}
