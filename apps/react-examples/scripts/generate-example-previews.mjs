import puppeteer from 'puppeteer';
import * as Fs from 'node:fs';
import * as Path from 'node:path';
import * as Url from 'node:url';

// ES modules in node don't support the `__dirname` global, but we can recover it
// with some help from the `Url` module.
//
// see: https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
const __dirname = Url.fileURLToPath(new URL('.', import.meta.url));

const REACT_FLOW_SITE = Path.resolve(__dirname, '../../../sites/reactflow.dev');
const IMG_OUTPUT_DIR = Path.resolve(REACT_FLOW_SITE, './public/img/examples');

function getExampleData() {
  const REACT_FLOW_EXAMPLES_DIR = Path.resolve(
    REACT_FLOW_SITE,
    './src/pages/examples',
  );
  const examples = [];

  const scanDir = (dir) => {
    const content = Fs.readdirSync(dir, { withFileTypes: true });

    for (let c of content) {
      if (c.isDirectory()) {
        scanDir(Path.resolve(c.path, c.name));
      } else if (c.name.endsWith('.mdx')) {
        const mdxPath = Path.resolve(c.path, c.name);
        const mdxContent = Fs.readFileSync(mdxPath).toString();
        const codePath = mdxContent.match(/(?<=codePath=")(.*)(?=")/gm);
        const websitePath = mdxPath.match(
          /(?<=\/pages\/examples\/)(.*)(?=\.mdx$)/g,
        );
        const isProExample = !!mdxContent.includes('is_pro_example: true');
        const proExampleId = mdxContent.match(/(?<=slug=")(.*)(?=")/gm);
        const screenshotPath = Path.resolve(
          IMG_OUTPUT_DIR,
          `${websitePath}.jpg`,
        );

        examples.push({
          mdxPath: mdxPath,
          websitePath: websitePath ? websitePath[0] : '',
          codePath: codePath ? codePath[0].replace('example-flows/', '') : '',
          isProExample,
          proExampleId: proExampleId ? proExampleId[0] : '',
          screenshotPath,
        });

        Fs.mkdirSync(Path.dirname(screenshotPath), { recursive: true });
      }
    }
  };

  scanDir(REACT_FLOW_EXAMPLES_DIR);

  return examples;
}

(async () => {
  const exampleData = getExampleData();
  console.log(exampleData);

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
  });
  const page = await browser.newPage();

  // Set screen size
  await page.setViewport({ width: 1024, height: 768 });

  for (const example of exampleData) {
    const url = example.isProExample
      ? `https://pro-examples.reactflow.dev/${example.proExampleId}`
      : `http://localhost:5173/?path=${example.codePath}`;

    await page.goto(url);

    try {
      await page.waitForSelector('.react-flow', { timeout: 1000 });
      await page.screenshot({
        path: example.screenshotPath,
      });
    } catch (err) {
      console.log('error:', example.codePath);
    }
  }

  await browser.close();
})();
