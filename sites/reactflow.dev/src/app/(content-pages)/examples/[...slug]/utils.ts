import path from 'path';
import { Folder } from 'nextra';

import { meta } from './config';
import { getExamplesPageMap } from 'xy-shared/server';
import fs from 'fs/promises';

export async function getPageMap(): Promise<Folder> {
  const examplesPath = path.resolve('../../apps/example-apps/react/examples');
  console.log(
    111,
    'list',
    await fs.readdir(path.resolve('../..'), { withFileTypes: true }),
  );
  return getExamplesPageMap(examplesPath, meta, importMetadata);
}

export function importMetadata(route: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- `require` supports Fast Refresh
  const result = require(
    // The static analyzer needs to know the import path as precisely as possible.
    // To achieve this, we keep `examples/` in the import path.
    `private-next-root-dir/../../apps/example-apps/react/examples/${route.replace('/examples/', '')}/README.mdx`,
  );
  return result.metadata;
}
