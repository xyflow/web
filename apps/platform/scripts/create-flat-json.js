const fs = require('fs');
const path = require('path');
const data = require('../public/data/file-tree.json');

const outputFile = path.resolve(__dirname, '../public/data/file-tree-flat.json');

const nodes = [];
const edges = [];

function parse(items) {
  items.forEach((item) => {
    nodes.push({ id: item.url, data: { label: item.name }, position: { x: 0, y: 0 } });

    if (item.children) {
      item.children.forEach((child) => {
        const source = item.url;
        const target = child.url;
        edges.push({ id: `${source}->${target}`, source, target });
      });

      parse(item.children);
    }
  });
}

parse(data);

fs.writeFileSync(outputFile, JSON.stringify({ nodes, edges }, null, 4));
