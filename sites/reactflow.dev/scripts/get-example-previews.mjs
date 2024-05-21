import puppeteer from 'puppeteer';
import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';
import * as Url from 'node:url';

// ES modules in node don't support the `__dirname` global, but we can recover it
// with some help from the `Url` module.
//
// see: https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
const __dirname = Url.fileURLToPath(new URL('.', import.meta.url));

const OUTPUT_PATH = Path.resolve(__dirname, '../public/img/examples');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://reactflow.dev/examples');

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  await page.waitForSelector('.nextra-sidebar-container');
  const links = await page.$$eval('.nextra-sidebar-container a', (el) =>
    el.map((x) => x.getAttribute('href')),
  );

  for (const link of links) {
    const exampleId = link.replace('/examples', '').replace(/\//g, '_');
    await page.goto(`https://reactflow.dev${link}`);

    const iframe = await page.waitForSelector('main iframe');

    console.log('screnshotting...', exampleId);

    try {
      await page.waitForFrame(async (frame) => true);
      await iframe.screenshot({
        path: Path.resolve(OUTPUT_PATH, `${exampleId}.png`),
      });
    } catch (err) {
      console.log(err);
      console.log('failed to screenshot');
    }
  }

  // console.log(linkEls);

  // // Type into search box
  // await page.type('.devsite-search-field', 'automate beyond recorder');

  // // Wait and click on first result
  // const searchResultSelector = '.devsite-result-item-link';
  // await page.waitForSelector(searchResultSelector);
  // await page.click(searchResultSelector);

  // // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(
  //   'text/Customize and automate',
  // );
  // const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
})();
