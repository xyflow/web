import { Folder } from 'nextra';

import { getExamplesPageMap } from 'xy-shared/server/example-utils';

export async function getPageMap(): Promise<Folder> {
  return getExamplesPageMap();
}
