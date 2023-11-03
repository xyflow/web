import { readFile, readdir, stat } from 'fs/promises';
import { serialize } from 'next-mdx-remote/serialize';
import { type InternalRoute } from '../routes';
import * as Path from 'path';
import * as Url from 'url';

const __dirname = Url.fileURLToPath(import.meta.url);

export async function getMdxContentUnderRoute(route: InternalRoute) {
  const path = Path.join(__dirname, '../../../pages', route);
  const files = await readdir(path);
  const mdx = [];

  for (const file of files) {
    if (file.endsWith('.mdx')) {
      const raw = await readFile(Path.join(path, file), 'utf8');
      const parsed = await serialize(raw, { parseFrontmatter: true });

      parsed.frontmatter.route = Path.join(route, Path.basename(file, '.mdx'));

      if (!parsed.frontmatter.date) {
        let lastModified;
        try {
          const { mtime } = await stat(Path.join(path, file));
          lastModified = mtime;
        } catch (_) {
          lastModified = Date.now();
        }

        const [date] = new Date(lastModified).toISOString().split('T');

        parsed.frontmatter.date = date;
      }

      mdx.push(parsed);
    }
  }

  return mdx.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}
