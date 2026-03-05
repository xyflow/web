import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';
import * as Url from 'node:url';

import puppeteer from 'puppeteer';

const __dirname = Url.fileURLToPath(new URL('.', import.meta.url));

// Parse command line arguments
const args = process.argv.slice(2);
const onlyMissing = args.includes('--only-missing') || args.includes('-m');
const showHelp = args.includes('--help') || args.includes('-h');

if (showHelp) {
  console.log(`
📸 Screenshot Generator for XYFlow Examples

Usage:
  node generate-screenshots.js [options]

Options:
  --only-missing, -m    Only generate screenshots for examples missing previews
  --help, -h           Show this help message

Examples:
  node generate-screenshots.js              # Generate all screenshots
  node generate-screenshots.js --only-missing # Generate only missing screenshots
`);
  process.exit(0);
}

const REACT_FLOW_EXAMPLES = Path.resolve(__dirname, '../react');
const SVELTE_FLOW_EXAMPLES = Path.resolve(__dirname, '../svelte');

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  headless: false,
  args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
});
const page = await browser.newPage();

// this is 16/6 aspect ratio like the preview images
await page.setViewport({ width: 1024, height: 576 });

let screenshotCount = 0;
let skippedCount = 0;

if (onlyMissing) {
  console.log('🔍 Scanning for missing preview images...');
}

await makeScreenshots(REACT_FLOW_EXAMPLES, '.react-flow');
await makeScreenshots(SVELTE_FLOW_EXAMPLES, '.svelte-flow');

await browser.close();

if (onlyMissing) {
  console.log(
    `\n✅ Complete! Generated ${screenshotCount} missing screenshots, skipped ${skippedCount} existing ones.`,
  );
} else {
  console.log(`\n✅ Complete! Generated ${screenshotCount} screenshots total.`);
}

async function makeScreenshots(dir, selector) {
  const content = await Fs.readdir(dir, { withFileTypes: true });

  for (let c of content) {
    if (c.isDirectory()) {
      await makeScreenshots(Path.resolve(c.parentPath, c.name), selector);
    } else if (c.name === 'index.html') {
      const exampleFolder = c.parentPath.split('index.html')[0];
      const examplePath = c.parentPath.split('example-apps')?.[1];
      const exampleUrl = `http://localhost:5173${examplePath}/index.html`;
      const lightScreenshotPath = Path.resolve(exampleFolder, 'preview.jpg');
      const darkScreenshotPath = Path.resolve(exampleFolder, 'preview-dark.jpg');
      const shouldCapture = { light: true, dark: true };

      // Check which screenshots are missing when --only-missing flag is used.
      if (onlyMissing) {
        const hasLightPreview = await fileExists(lightScreenshotPath);
        const hasDarkPreview = await fileExists(darkScreenshotPath);

        shouldCapture.light = !hasLightPreview;
        shouldCapture.dark = !hasDarkPreview;

        if (!shouldCapture.light && !shouldCapture.dark) {
          console.log('⏭️  Skipping (already exists):', examplePath);
          skippedCount++;
          continue;
        }

        const missingVariants = [
          shouldCapture.light ? 'light' : null,
          shouldCapture.dark ? 'dark' : null,
        ]
          .filter(Boolean)
          .join(', ');

        console.log(`📸 Generating missing ${missingVariants} preview(s):`, examplePath);
      }

      // Retry if Hot Module Reload causes navigation to abort
      try {
        await page.goto(exampleUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      } catch (err) {
        if (String(err).includes('ERR_ABORTED')) {
          await sleep(500);
          await page.goto(exampleUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
        } else {
          console.log('navigate error:', exampleUrl, err);
          continue;
        }
      }

      if (!onlyMissing) {
        console.log('screenshot:', exampleUrl);
      }

      // Hide the elements before taking the screenshot
      await page.evaluate(() => {
        const hideElement = (selector) => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((element) => (element.style.display = 'none'));
        };
        hideElement('.react-flow__attribution a');
        hideElement('.react-flow__panel');
      });

      try {
        await page.waitForSelector(selector, { timeout: 5000 });

        if (shouldCapture.light) {
          await page.evaluate(() => {
            const wrappers = document.querySelectorAll('.react-flow, .svelte-flow');
            wrappers.forEach((wrapper) => wrapper.classList.remove('dark'));
          });
          await sleep(100);
          await page.screenshot({ path: lightScreenshotPath });
          screenshotCount++;
        }

        if (shouldCapture.dark) {
          await page.evaluate(() => {
            const wrappers = document.querySelectorAll('.react-flow, .svelte-flow');
            wrappers.forEach((wrapper) => wrapper.classList.add('dark'));
          });
          await sleep(100);
          await page.screenshot({ path: darkScreenshotPath });
          screenshotCount++;
        }
      } catch (err) {
        console.log('error:', exampleUrl, err);
      }
    }
  }
}

async function fileExists(path) {
  try {
    await Fs.access(path);
    return true;
  } catch {
    return false;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
