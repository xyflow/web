import fg from 'fast-glob';
import { DynamicMeta, Folder, PageMapItem } from 'nextra';
import {
  convertToPageMap,
  mergeMetaWithPageMap,
  normalizePageMap,
} from 'nextra/page-map';
import path from 'path';

export async function getAllExamples(examplesPath: string): Promise<string[]> {
  try {
    // Ensure the path is absolute and resolve any relative path issues
    const absolutePath = path.isAbsolute(examplesPath) 
      ? examplesPath 
      : path.resolve(examplesPath);
    
    console.log('getAllExamples - examplesPath:', examplesPath);
    console.log('getAllExamples - absolutePath:', absolutePath);
    console.log('getAllExamples - process.cwd():', process.cwd());
    
    // Check if the directory exists
    const fs = await import('fs/promises');
    try {
      const stats = await fs.stat(absolutePath);
      if (!stats.isDirectory()) {
        console.error('getAllExamples - Path is not a directory:', absolutePath);
        return [];
      }
    } catch (error) {
      console.error('getAllExamples - Directory does not exist:', absolutePath, error);
      return [];
    }

    const result = await fg(
      [
        '**/README.mdx',
        '!**/misc/overview/README.mdx',
        '!**/misc/feature-overview/README.mdx', // ignore because we need to put it in `examples/overview`
      ],
      {
        cwd: absolutePath,
        absolute: false, // Return relative paths
        ignore: ['node_modules/**', '.git/**'], // Ignore common directories
      },
    );

    console.log('getAllExamples - Found files:', result);
    
    const processedPaths = result.map((filePath) => filePath.replace('/README.mdx', ''));
    console.log('getAllExamples - Processed paths:', processedPaths);
    
    return processedPaths;
  } catch (error) {
    console.error('getAllExamples - Error:', error);
    return [];
  }
}

export async function getExamplesPageMap(
  examplesPath: string,
  meta: DynamicMeta,
  importMetadata: (route: string) => DynamicMeta,
): Promise<Folder> {
  const filePaths = await getAllExamples(examplesPath);
  console.log({ filePaths });
  const { pageMap: _pageMap } = convertToPageMap({
    filePaths,
    basePath: 'examples',
  });
  const examplesPageMap = mergeMetaWithPageMap(_pageMap[0], meta);
  const pageMap = normalizePageMap(examplesPageMap);
  console.log({ pageMap });
  return addFrontMatter(pageMap, importMetadata);
}

function addFrontMatter(
  item: PageMapItem,
  importMetadata: (route: string) => DynamicMeta,
) {
  if ('children' in item) {
    return {
      ...item,
      children: item.children.map((i) => addFrontMatter(i, importMetadata)),
    };
  }
  if ('name' in item) {
    return {
      ...item,
      frontMatter: importMetadata(item.route),
    };
  }
  return item;
}
