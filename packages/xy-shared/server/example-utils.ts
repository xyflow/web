import { Folder } from 'nextra';
import { getPageMap } from 'nextra/page-map';

export async function getExamplesPageMap(): Promise<Folder> {
  const pageMap = await getPageMap();
  const examplesFolder = pageMap.filter(
    (item): item is Folder => 'children' in item && item.name === 'examples',
  );

  return examplesFolder?.[0];
}
