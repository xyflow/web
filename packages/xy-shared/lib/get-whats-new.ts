import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';

export async function getWhatsNew() {
  'use cache';
  const pageMap = (await getPageMap('/whats-new')) as MdxFile[];
  return pageMap
    .filter((item) => 'frontMatter' in item)
    .sort((a, b) => Date.parse(b.frontMatter!.date) - Date.parse(a.frontMatter!.date));
}
