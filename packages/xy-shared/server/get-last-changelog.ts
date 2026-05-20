import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';
import { Author } from '../components/authors-list';

type MdxItem = MdxFile<WhatsNewItemFrontMatter> & { title: string };

export async function getLastChangelog() {
  'use cache';
  return (await getPageMap('/whats-new'))
    .filter((item): item is MdxItem => 'frontMatter' in item)
    .sort((a, b) => Date.parse(b.frontMatter!.date) - Date.parse(a.frontMatter!.date));
}

export type WhatsNewItemFrontMatter = {
  title: string;
  description: string;
  authors: Author[];
  date: `${number}-${number}-${number}`;
};
