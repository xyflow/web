const https = require('https');
const path = require('path');
const fs = require('fs');

const GITHUB_API_URL = 'https://api.github.com/repos/wbkd/react-flow';
const REACT_FLOW_RENDERER_DOWNLOADS_URL =
  'https://api.npmjs.org/downloads/point/last-week/react-flow-renderer';
const REACTFLOW_DOWNLOADS_URL = 'https://api.npmjs.org/downloads/point/last-week/reactflow';
const OUTPUT_PATH = path.resolve(__dirname, '../static/data/stats.json');

const fetchJSON = async function (url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'webkid' } }, (response) => {
      let json = '';
      response.on('data', (chunk) => (json += chunk));
      response.on('error', reject);
      response.on('end', () => resolve(JSON.parse(json)));
    });
  });
};

(async () => {
  const { stargazers_count: stars } = await fetchJSON(GITHUB_API_URL);
  const { downloads: reactFlowRendererDownloads } = await fetchJSON(
    REACT_FLOW_RENDERER_DOWNLOADS_URL
  );
  const { downloads: reactFlowDownloads } = await fetchJSON(REACTFLOW_DOWNLOADS_URL);

  const downloads = reactFlowRendererDownloads + reactFlowDownloads;

  if (!downloads || !stars) {
    return console.log('could not fetch downloads and stars. please try again.');
  }

  const stats = {
    stars,
    downloads,
  };

  console.log(`⭐️ ${stats.stars}`);
  console.log(`📲 ${stats.downloads}`);

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(stats));
})();
