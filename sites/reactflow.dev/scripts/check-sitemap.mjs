import { XMLParser } from 'fast-xml-parser';

const xmlParser = new XMLParser();

async function getSitePaths(url) {
  const response = await fetch(url);
  const sitemapXML = await response.text();
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

  let unmatched = await getSitePaths('https://reactflow.dev/sitemap.xml');

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

  const rfPaths = await getSitePaths(
    'https://reactflow-website.vercel.app/sitemap.xml',
  );

  const match = (originalPath, lookupPath) => {
    const newPath = rfPaths.find((p) => p === lookupPath);

    if (newPath) {
      redirect(originalPath, newPath);
    }
  };

  const xyPaths = await getSitePaths('https://xyflow.com/sitemap.xml');

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

  // // redirects for the blog pages
  // const blogPaths = unmatchedPaths.filter((path) => path.startsWith('/blog/'));

  // blogPaths.forEach((blogPath) => {
  //   // if the url doesn't exist, we just redirect to the blog page
  //   const newPath =
  //     xyFlowPaths.find((path) => path.includes(blogPath)) ?? '/blog';
  //   const newUrl = `https://xyflow.com${newPath}`;

  //   redirects.push({ source: blogPath, destination: newUrl, permanent: true });
  // });

  console.log(redirects);
  console.log(unmatched);

  // const oldSitemapXML = await fetchSitemap();
  // const newSitemapXML = await fetchSitemap();

  // const sitemapXML = await fetchSitemap();

  // let failedCount = 0;

  // for (const url of urls) {
  //   const res = await fetch(url, { method: 'HEAD' });

  //   if (res.status !== 200) {
  //     failedCount++;
  //     console.log(url, res.status);
  //   }
  // }

  // console.log(`Couldn't fetch ${failedCount} pages.`);
}

start();
