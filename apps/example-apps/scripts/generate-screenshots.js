import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';
import * as Url from 'node:url';

import puppeteer from 'puppeteer';

const __dirname = Url.fileURLToPath(new URL('.', import.meta.url));

const REACT_FLOW_EXAMPLES = Path.resolve(__dirname, '../react');
const SVELTE_FLOW_EXAMPLES = Path.resolve(__dirname, '../svelte');

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  headless: false,
  args: [
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process',
  ],
});
const page = await browser.newPage();

// this is 16/6 aspect ratio like the preview images
await page.setViewport({ width: 1024, height: 576 });

await makeScreenshots(REACT_FLOW_EXAMPLES, '.react-flow');
await makeScreenshots(SVELTE_FLOW_EXAMPLES, '.svelte-flow');

await browser.close();

async function makeScreenshots(dir, selector) {
  const content = await Fs.readdir(dir, { withFileTypes: true });

  for (let c of content) {
    if (c.isDirectory()) {
      await makeScreenshots(Path.resolve(c.path, c.name), selector);
    } else if (c.name === 'index.html') {
      const exampleFolder = c.path.split('index.html')[0];
      const examplePath = c.path.split('example-apps')?.[1];
      const exampleUrl = `http://localhost:5173${examplePath}/index.html`;
      const screenshotPath = Path.resolve(exampleFolder, 'preview.jpg');

      await page.goto(exampleUrl);

      console.log('screenshot:', exampleUrl);

      try {
        await page.waitForSelector(selector, { timeout: 1000 });
        await page.screenshot({
          path: screenshotPath,
        });
      } catch (err) {
        console.log('error:', exampleUrl, err);
      }
    }
  }
}
