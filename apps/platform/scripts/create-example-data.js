const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const GITHUB_API_TOKEN = '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';
const OUTPUT_PATH = path.resolve(__dirname, '../public', 'data', 'file-tree.json');

const getTree = async (url) => {
  const data = [];
  const res = await fetch(url, { headers: { Authorization: `token ${GITHUB_API_TOKEN}` } });
  const json = await res.json();

  if (json.tree) {
    for await (const item of json.tree) {
      console.log('get item:', item.path);
      const datum = { name: item.path, url: item.url };

      if (item.type === 'tree') {
        datum.children = await getTree(item.url);
      }

      data.push(datum);
    }
  }

  return data;
};

(async () => {
  const data = await getTree(
    'https://api.github.com/repos/wbkd/react-flow/git/trees/3bd756d8a610935d4ec567cc348b2f608ca0108a'
  );

  const output = [
    {
      name: 'react-flow',
      url: 'https://github.com/wbkd/react-flow',
      children: data,
    },
  ];

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output));
})();
