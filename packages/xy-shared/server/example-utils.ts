import { Folder } from 'nextra';
import { getPageMap } from 'nextra/page-map';

export async function getExamplesPageMap(): Promise<Folder> {
  const __pageMap = await getPageMap();

  return __pageMap.filter(
    (item): item is Folder => 'children' in item && item.name === 'examples',
  )[0] as Folder;
}
