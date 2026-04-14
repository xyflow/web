import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';

export async function getBlogs() {
  'use cache';
  const pageMap = (await getPageMap('/blog')) as MdxFile[];
  return pageMap
    .filter(
      (item): item is MdxFile & { frontMatter: NonNullable<MdxFile['frontMatter']> } =>
        'frontMatter' in item && item.frontMatter !== undefined,
    )
    .sort((a, b) => Date.parse(b.frontMatter.date) - Date.parse(a.frontMatter.date));
}
