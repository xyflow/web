import { Folder, MdxFile, MetaJsonFile } from 'nextra';

// TYPES -----------------------------------------------------------------------

/** The types that nextra expose don't seem to have the `title` property on them,
 * but when I log the data it's there, so we're defining these types so that we
 * can use the title directly if it's available.
 */
export type TitledPageMapItem = TitledFolder | TitledMdxFile | MetaJsonFile;

export type TitledFolder = Folder & { title?: string };

export type TitledMdxFile = MdxFile & { title?: string };

// UTILS -----------------------------------------------------------------------

export const isFolder = (item: TitledPageMapItem): item is TitledFolder =>
  'children' in item;

export const isMdxFile = (item: TitledPageMapItem): item is TitledMdxFile =>
  'frontMatter' in item;
