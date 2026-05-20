import { XMLParser } from 'fast-xml-parser';

const SITEMAP_URLS = [
  'https://xyflow.com/sitemap.xml',
  'https://reactflow.dev/sitemap.xml',
  'https://svelteflow.dev/sitemap.xml',
];

const parser = new XMLParser();

async function fetchSitemap(url) {
  const response = await fetch(url);
  const text = await response.text();

  return text;
}

async function start() {
  for (const sitemapUrl of SITEMAP_URLS) {
    console.log(`\nChecking ${sitemapUrl}...`);

    const sitemapXML = await fetchSitemap(sitemapUrl);
    const { urlset } = parser.parse(sitemapXML);
    const urls = urlset.url.map((item) => item.loc);
    let failedCount = 0;

    for (const url of urls) {
      const res = await fetch(url, { method: 'HEAD' });

      if (res.status !== 200) {
        failedCount++;
        console.log(url, res.status);
      }
    }

    if (failedCount === 0) {
      console.log(`✅ All ${urls.length} pages are accessible`);
    } else {
      console.log(`❌ Failed to fetch ${failedCount} out of ${urls.length} pages`);
    }
  }
}

start();
