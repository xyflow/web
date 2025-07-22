import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';

export async function getLabs() {
  const pageMap = (await getPageMap('/labs')) as MdxFile[];
  return pageMap.filter((item) => 'frontMatter' in item);
}
