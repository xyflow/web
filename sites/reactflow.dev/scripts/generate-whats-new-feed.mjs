// This script is used to generate a JSON feed from all the entries under the
// /whats-new route. The contents of the script is actually mostly the same as
// the `mdx-content-under-route` util. It's not super clear to me (hayleigh) if
// we need this script or not but I couldn't work out a way to get this information
// into `theme.config.tsx` without having an actual file to import.
//
// If there's some sort of blessed next/nextra way to do this, we should definitely
// do that instead!
//

// TODO: Take a look at this blog post and consider using the `feed` package to
// generate RSS, Atom, and JSON feeds: https://blog.logrocket.com/adding-rss-feed-next-js-app/
//

import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';
import * as Url from 'node:url';
import { serialize } from 'next-mdx-remote/serialize';

// ES modules in node don't support the `__dirname` global, but we can recover it
// with some help from the `Url` module.
//
// see: https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
const __dirname = Url.fileURLToPath(new URL('.', import.meta.url));

const WHATS_NEW_PATH = Path.resolve(__dirname, '../src/pages/whats-new/');
const OUTPUT_PATH = Path.join(WHATS_NEW_PATH, '_feed.json');

const files = await Fs.readdir(WHATS_NEW_PATH);
const frontmatter = [];

for (const file of files) {
  if (file.endsWith('.mdx')) {
    const raw = await Fs.readFile(Path.join(WHATS_NEW_PATH, file), 'utf8');
    const parsed = await serialize(raw, { parseFrontmatter: true });

    parsed.frontmatter.route = Path.join(
      '/whats-new',
      Path.basename(file, '.mdx'),
    );

    if (!parsed.frontmatter.date) {
      let lastModified;

      try {
        const { mtime } = await stat(Path.join(WHATS_NEW_PATH, file));
        lastModified = mtime;
      } catch (_) {
        lastModified = Date.now();
      }

      const [date] = new Date(lastModified).toISOString().split('T');

      parsed.frontmatter.date = date;
    }

    frontmatter.push(parsed.frontmatter);
  }
}

frontmatter.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

const json = JSON.stringify(frontmatter, null, 2);

await Fs.writeFile(OUTPUT_PATH, json, 'utf8');
