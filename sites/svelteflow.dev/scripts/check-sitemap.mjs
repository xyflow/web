import { XMLParser } from 'fast-xml-parser';

const SITEMAP_URL = 'https://reactflow.dev/sitemap.xml';
const LEGACY_URL = 'https://reactflow.dev';
const NEW_URL = 'https://xyflow-docs-git-staging-xyflow.vercel.app';

const parser = new XMLParser();

async function fetchSitemap() {
  const response = await fetch(SITEMAP_URL);
  const text = await response.text();

  return text;
}

async function start() {
  const sitemapXML = await fetchSitemap();
  const { urlset } = parser.parse(sitemapXML);
  const urls = urlset.url.map((item) => item.loc.replace(LEGACY_URL, NEW_URL));
  let failedCount = 0;

  for (const url of urls) {
    const res = await fetch(url, { method: 'HEAD' });

    if (res.status !== 200) {
      failedCount++;
      console.log(url, res.status);
    }
  }

  console.log(`Couldn't fetch ${failedCount} pages.`);
}

start();
