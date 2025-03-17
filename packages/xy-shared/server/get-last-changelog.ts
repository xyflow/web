import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';
import { Author } from '../widgets/authors-list';

type MdxItem = MdxFile<WhatsNewItemFrontMatter> & { title: string };

export async function getLastChangelog() {
  return (await getPageMap('/whats-new'))
    .filter((item): item is MdxItem => 'frontMatter' in item)
    .sort(
      (a, b) =>
        new Date(b.frontMatter!.date).getTime() -
        new Date(a.frontMatter!.date).getTime(),
    );
}

export type WhatsNewItemFrontMatter = {
  title: string;
  description: string;
  authors: Author[];
  date: `${number}-${number}-${number}`;
};
