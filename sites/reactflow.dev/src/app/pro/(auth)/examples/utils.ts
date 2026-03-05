import path from 'path';
import { Folder } from 'nextra';

import { meta } from './config';
import { getExamplesPageMap } from 'xy-shared/server/example-utils';

export async function getPageMap(): Promise<Folder> {
  const examplesPath = path.resolve('../../apps/example-apps/react/examples');
  return getExamplesPageMap(examplesPath, meta, importMetadata);
}

export function importMetadata(route: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- `require` supports Fast Refresh
  const result = require(
    `private-next-root-dir/../../apps/example-apps/react/examples/${route.replace('/examples/', '')}/README.mdx`,
  );
  return result.metadata;
}
