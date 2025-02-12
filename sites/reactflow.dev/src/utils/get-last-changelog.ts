import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';
import { Author } from 'xy-shared';

export async function getLastChangelog() {
  return (await getPageMap('/whats-new'))
    .filter((item): item is MdxFile<WhatsNewItemFrontMatter> => 'name' in item && item.name !== 'index')
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date).getTime() -
        new Date(a.frontMatter.date).getTime(),
    )
}

export type WhatsNewItemFrontMatter = {
  title: string;
  description: string;
  authors: Author[];
  date: `${number}-${number}-${number}`;
};
