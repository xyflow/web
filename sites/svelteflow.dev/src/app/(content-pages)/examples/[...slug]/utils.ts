import path from 'path';
import { Folder } from 'nextra';

import { getExamplesPageMap } from 'xy-shared/server';
import { meta } from './config';

export async function getPageMap(): Promise<Folder> {
  const examplesPath = path.resolve('../../apps/example-apps/svelte/examples');
  return getExamplesPageMap(examplesPath, meta, importMetadata);
}

export function importMetadata(route: string) {
  const result = require(
    // The static analyzer needs to know the import path as precisely as possible.
    // To achieve this, we keep `examples/` in the import path.
    `@/../../apps/example-apps/svelte/examples/${route.replace('/examples/', '')}/README.mdx?metadata`,
  );
  return result.metadata;
}
