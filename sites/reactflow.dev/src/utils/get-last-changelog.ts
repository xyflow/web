import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';

export async function getLastChangelog() {
  return (await getPageMap('/whats-new'))
    .filter((item): item is MdxFile => 'name' in item && item.name !== 'index')
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date).getTime() -
        new Date(a.frontMatter.date).getTime(),
    )
}
