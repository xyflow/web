import { buildDynamicMDX } from 'nextra/remote';
import { readFile, readdir, stat } from 'fs/promises';
import * as Path from 'path';
import * as Url from 'url';

const __dirname = Url.fileURLToPath(import.meta.url);

// @todo can we put this in xy-shared=
export async function getMdxContentUnderRoute<T extends string>(
  site: string,
  route: T,
) {
  const path = Path.join(
    __dirname,
    '../../../../sites',
    site,
    'src/pages',
    route,
  );
  const files = await readdir(path);
  const mdx = [];

  for (const file of files) {
    if (file.endsWith('.mdx')) {
      const raw = await readFile(Path.join(path, file), 'utf8');

      const parsed = await buildDynamicMDX(raw, {});
      const frontmatter = parsed.__nextra_dynamic_opts.frontMatter;
      frontmatter.route = Path.join(route, Path.basename(file, '.mdx'));

      if (!frontmatter.date) {
        let lastModified;
        try {
          const { mtime } = await stat(Path.join(path, file));
          lastModified = mtime;
        } catch (_) {
          lastModified = Date.now();
        }

        const [date] = new Date(lastModified).toISOString().split('T');

        frontmatter.date = date;
      }

      mdx.push({
        mdx: parsed.__nextra_dynamic_mdx,
        frontmatter,
        title: parsed.__nextra_dynamic_opts.title,
      });
    }
  }

  return mdx.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}
