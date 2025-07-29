import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';

export async function getBlogs() {
  const pageMap = (await getPageMap('/blog')) as MdxFile[];
  return pageMap
    .filter((item) => 'frontMatter' in item)
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime(),
    );
}
