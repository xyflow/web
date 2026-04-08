import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';

export async function getWhatsNew() {
  const pageMap = (await getPageMap('/whats-new')) as MdxFile[];
  return pageMap
    .filter((item) => 'frontMatter' in item)
    .sort(
      (a, b) =>
        new Date(b.frontMatter!.date).getTime() - new Date(a.frontMatter!.date).getTime(),
    );
}
