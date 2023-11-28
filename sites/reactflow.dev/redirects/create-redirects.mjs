/**
 * This script reads in the old sitemap of reactflow.dev and tries to match
 * each path to a new one.
 * It outputs the redirects.json file that is being used in the nextjs config.
 */
import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import staticRedirects from './data/static-redirects.json' assert { type: 'json' };
import legacyRedirects from './data/legacy-redirects.json' assert { type: 'json' };
import errorRedirects from './data/error-redirects.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OLD_RF_SITEMAP = path.join(__dirname, './data/sitemap-rf-v11.xml');
const NEW_RF_SITEMAP = 'https://reactflow.dev/sitemap.xml';
const XY_SITEMAP = 'https://xyflow.com/sitemap.xml';
const OUTPUT = path.join(__dirname, 'redirects.json');

const xmlParser = new XMLParser();

async function getSitePaths(url) {
  const isLocal = !url.startsWith('http');

  let sitemapXML = '';

  if (isLocal) {
    sitemapXML = fs.readFileSync(url, 'utf8').toString();
  } else {
    const response = await fetch(url);
    sitemapXML = await response.text();
  }

  const { urlset } = xmlParser.parse(sitemapXML);
  const paths = urlset.url.map((item) =>
    item.loc
      .replace('https://reactflow.dev', '')
      .replace('https://xyflow.com', '')
      .replace(/\/$/g, ''),
  );

  return paths;
}

async function start() {
  const redirects = [];

  let unmatched = await getSitePaths(OLD_RF_SITEMAP);

  const redirect = (from, to, domain = '') => {
    unmatched = unmatched.filter((path) => path !== from);

    if (to) {
      redirects.push({
        source: from,
        destination: `${domain}${to}`,
        permanent: true,
      });
    }
  };

  const rfPaths = await getSitePaths(NEW_RF_SITEMAP);

  const match = (originalPath, lookupPath) => {
    const newPath = rfPaths.find((p) => p === lookupPath);

    if (newPath) {
      redirect(originalPath, newPath);
    }
  };

  [...staticRedirects, ...errorRedirects].forEach(({ source, destination }) =>
    redirect(source, destination),
  );

  const xyPaths = await getSitePaths(XY_SITEMAP);

  unmatched.forEach((path) => {
    // first filter out all the paths that haven't changed
    if (rfPaths.includes(path)) {
      console.log('path didnt change:', path);
      return redirect(path);
    }

    // handle blog redirects
    if (path.startsWith('/blog')) {
      const newPath =
        xyPaths.find((xyPath) => xyPath.includes(path)) ?? '/blog';
      return redirect(path, newPath, 'https://xyflow.com');
    }

    if (path.startsWith('/newsletter')) {
      return redirect(path, '/');
    }

    match(path, path.replace('/docs/api', '/api-reference'));
    match(path, path.replace('/docs/api/edges', '/api-reference/components'));
    match(path, path.replace('/docs/api/nodes', '/api-reference/components'));
    match(
      path,
      path.replace('/docs/api/plugin-components', '/api-reference/components'),
    );
    match(path, path.replace('/docs/examples', '/examples'));
    match(path, path.replace('/docs/concepts', '/learn/concepts'));
    match(path, path.replace('/docs/guides', '/learn/customization'));
    match(
      path,
      path.replace('/docs/getting-started', '/learn/getting-started'),
    );
    match(path, path.replace('/docs/guides', '/learn/advanced-use'));
    match(path, path.replace('/docs/guides', '/learn/troubleshooting'));
    match(path, path.replace('/docs/guides', '/learn/layouting'));
  });

  console.log('unmatched paths:', unmatched);
  console.log(
    redirects.map((r) => `${r.source} ➜ ${r.destination}`).join('\n'),
  );

  let legacy = [];

  legacyRedirects
    // filter out redirects that are already in the redirects.json
    .filter((item) => !redirects.find((r) => r.source === item.source))
    .forEach((item) => {
      const newRedirect = redirects.find((r) => r.source === item.destination);

      if (newRedirect && item.source !== newRedirect.destination) {
        return legacy.push({
          source: item.source,
          destination: newRedirect.destination,
          permanent: true,
        });
      }

      const legacyRedirect = legacyRedirects.find(
        (r) => r.source === item.destination,
      );

      if (legacyRedirect) {
        return legacy.push({
          source: item.source,
          destination: legacyRedirect.destination,
          permanent: true,
        });
      }

      console.log('unmatched legacy redirect:', item.source, item.destination);
    });

  legacy = legacy.filter(
    (item) =>
      !redirects.find(
        (r) => r.source === item.source && r.destination === item.destination,
      ),
  );

  console.log(
    legacy.map((r) => `(legacy) ${r.source} ➜ ${r.destination}`).join('\n'),
  );

  redirects.push(...legacy);

  console.log(redirects.length);

  fs.writeFileSync(OUTPUT, JSON.stringify(redirects, null, 2));
}

start();
