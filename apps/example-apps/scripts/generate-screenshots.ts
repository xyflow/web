import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';
import * as Url from 'node:url';

import { diff as blazediff } from '@blazediff/core';
import puppeteer, { type Browser, type Page } from 'puppeteer';
import sharp from 'sharp';

const __dirname = Url.fileURLToPath(new URL('.', import.meta.url));

// Parse command line arguments
const args = process.argv.slice(2);
const onlyMissing = args.includes('--only-missing') || args.includes('-m');
const showHelp = args.includes('--help') || args.includes('-h');
const freezeAfterMs = getNumericArg('--freeze-after-ms', 200);
const baseUrl = normalizeBaseUrl(
  getStringArg('--base-url', process.env.SCREENSHOT_BASE_URL ?? 'http://127.0.0.1:4173'),
);

if (showHelp) {
  console.log(`
📸 Screenshot Generator for XYFlow Examples

Usage:
  pnpm exec tsx scripts/generate-screenshots.ts [options]

Options:
  --only-missing, -m    Only generate screenshots for examples missing previews
  --base-url            Base URL used for screenshots (default: http://127.0.0.1:4173)
  --freeze-after-ms     Wait N ms after load, then freeze animations/timers (default: 150)
  --help, -h           Show this help message

Examples:
  pnpm exec tsx scripts/generate-screenshots.ts              # Generate all screenshots
  pnpm exec tsx scripts/generate-screenshots.ts --base-url http://127.0.0.1:5173
  pnpm exec tsx scripts/generate-screenshots.ts --freeze-after-ms 3000
  pnpm exec tsx scripts/generate-screenshots.ts --only-missing # Generate only missing screenshots
`);
  process.exit(0);
}

const REACT_FLOW_EXAMPLES = Path.resolve(__dirname, '../react');
const SVELTE_FLOW_EXAMPLES = Path.resolve(__dirname, '../svelte');
const EXAMPLE_APPS_ROOT = Path.resolve(__dirname, '..');
const EXCLUDED_EXAMPLE_PATHS = new Set<string>([
  'react/tutorials/webaudio/mouse-theremin',
]);

let screenshotCount = 0;
let skippedCount = 0;
let unchangedCount = 0;

async function makeScreenshots(dir: string, selector: string, page: Page): Promise<void> {
  const currentRelativePath = toPosixPath(Path.relative(EXAMPLE_APPS_ROOT, dir));
  if (EXCLUDED_EXAMPLE_PATHS.has(currentRelativePath)) {
    console.log('⏭️  Excluded from screenshots:', `/${currentRelativePath}`);
    skippedCount++;
    return;
  }

  const content = await Fs.readdir(dir, { withFileTypes: true });

  for (const c of content) {
    if (c.isDirectory()) {
      const subDir = Path.resolve(dir, c.name);
      await makeScreenshots(subDir, selector, page);
    } else if (c.name === 'index.html') {
      const exampleFolder = dir;
      const relativePath = Path.relative(EXAMPLE_APPS_ROOT, dir);
      const normalizedRelativePath = toPosixPath(relativePath);
      if (EXCLUDED_EXAMPLE_PATHS.has(normalizedRelativePath)) {
        console.log('⏭️  Excluded from screenshots:', `/${normalizedRelativePath}`);
        skippedCount++;
        continue;
      }
      const examplePath = `/${normalizedRelativePath}`;
      const exampleUrl = `${baseUrl}${examplePath}/index.html`;
      const lightScreenshotPath = Path.resolve(exampleFolder, 'preview.jpg');
      const darkScreenshotPath = Path.resolve(exampleFolder, 'preview-dark.jpg');
      const shouldCapture: { light: boolean; dark: boolean } = {
        light: true,
        dark: true,
      };

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
        await page.goto(exampleUrl, {
          waitUntil: 'domcontentloaded',
          timeout: 15000,
        });
      } catch (err) {
        if (String(err).includes('ERR_ABORTED')) {
          await sleep(500);
          await page.goto(exampleUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 15000,
          });
        } else {
          console.log('navigate error:', exampleUrl, err);
          continue;
        }
      }

      // Hide the elements before taking the screenshot
      await page.evaluate(`
        (function() {
          var hideElement = function(sel) {
            var elements = document.querySelectorAll(sel);
            elements.forEach(function(el) { el.style.display = 'none'; });
          };
          hideElement('.react-flow__attribution a');
          hideElement('.react-flow__panel');
          hideElement('.svelte-flow__attribution a');
          hideElement('.svelte-flow__panel');
        })();
      `);
      await applyScreenshotStyleOverrides(page);

      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        await settleAndFreezePage(page, freezeAfterMs);

        if (shouldCapture.light) {
          await page.evaluate(`
            (function() {
              var wrappers = document.querySelectorAll('.react-flow, .svelte-flow');
              wrappers.forEach(function(w) { w.classList.remove('dark'); });
            })();
          `);
          await sleep(100);
          const lightImage = (await page.screenshot({
            type: 'jpeg',
          })) as Uint8Array;
          const didUpdate = await writeScreenshotIfChanged(
            lightScreenshotPath,
            lightImage,
            `${exampleUrl} (light)`,
          );
          if (didUpdate) {
            screenshotCount++;
          } else {
            unchangedCount++;
          }
        }

        if (shouldCapture.dark) {
          await page.evaluate(`
            (function() {
              var wrappers = document.querySelectorAll('.react-flow, .svelte-flow');
              wrappers.forEach(function(w) { w.classList.add('dark'); });
            })();
          `);
          await sleep(100);
          const darkImage = (await page.screenshot({
            type: 'jpeg',
          })) as Uint8Array;
          const didUpdate = await writeScreenshotIfChanged(
            darkScreenshotPath,
            darkImage,
            `${exampleUrl} (dark)`,
          );
          if (didUpdate) {
            screenshotCount++;
          } else {
            unchangedCount++;
          }
        }
      } catch (err) {
        console.log('error:', exampleUrl, err);
      }
    }
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await Fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function getNumericArg(flag: string, fallback: number): number {
  const index = args.indexOf(flag);
  if (index === -1) {
    return fallback;
  }

  const rawValue = args[index + 1];
  if (!rawValue) {
    console.warn(`⚠️ Missing value for ${flag}. Using default ${fallback}ms.`);
    return fallback;
  }

  const parsedValue = Number(rawValue);
  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    console.warn(
      `⚠️ Invalid value for ${flag}: "${rawValue}". Using default ${fallback}ms.`,
    );
    return fallback;
  }

  return parsedValue;
}

function getStringArg(flag: string, fallback: string): string {
  const index = args.indexOf(flag);
  if (index === -1) {
    return fallback;
  }

  const rawValue = args[index + 1];
  if (!rawValue) {
    console.warn(`⚠️ Missing value for ${flag}. Using default "${fallback}".`);
    return fallback;
  }

  return rawValue;
}

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

function toPosixPath(filePath: string): string {
  return filePath.split(Path.sep).join('/');
}

async function waitForServerReady(url: string, timeoutMs = 30000): Promise<void> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Server is not ready yet.
    }

    await sleep(250);
  }

  throw new Error(`Timed out waiting for server at ${url}`);
}

async function settleAndFreezePage(page: Page, waitMs: number): Promise<void> {
  if (waitMs > 0) {
    await sleep(waitMs);
  }

  await page.evaluate(() => {
    const win = window as Window & {
      __xyflowScreenshotsFrozen?: boolean;
      __xyflowScreenshotsOriginalRaf?: Window['requestAnimationFrame'];
      __xyflowScreenshotsOriginalSetTimeout?: Window['setTimeout'];
      __xyflowScreenshotsOriginalSetInterval?: Window['setInterval'];
      __xyflowScreenshotsFrozenNow?: number;
    };

    if (win.__xyflowScreenshotsFrozen) {
      return;
    }
    win.__xyflowScreenshotsFrozen = true;

    const style = document.createElement('style');
    style.setAttribute('data-xyflow-screenshot-freeze', 'true');
    style.textContent = `
      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `;
    document.head.appendChild(style);

    document.getAnimations().forEach((animation) => {
      animation.pause();
    });

    document.querySelectorAll('svg').forEach((element) => {
      const svg = element as SVGSVGElement;
      if (typeof svg.pauseAnimations === 'function') {
        svg.pauseAnimations();
      }
    });

    win.__xyflowScreenshotsFrozenNow = Date.now();
    win.__xyflowScreenshotsOriginalRaf = win.requestAnimationFrame.bind(win);
    win.__xyflowScreenshotsOriginalSetTimeout = win.setTimeout.bind(win);
    win.__xyflowScreenshotsOriginalSetInterval = win.setInterval.bind(win);

    win.requestAnimationFrame = (() => 0) as Window['requestAnimationFrame'];
    win.setTimeout = (() => 0) as Window['setTimeout'];
    win.setInterval = (() => 0) as Window['setInterval'];

    Date.now = () => win.__xyflowScreenshotsFrozenNow ?? 0;
    try {
      performance.now = () => 0;
    } catch {
      // Some runtimes expose performance.now as non-writable.
    }
  });
}

async function applyScreenshotStyleOverrides(page: Page): Promise<void> {
  await page.evaluate(() => {
    const STYLE_ID = 'xyflow-screenshot-edge-style-override';
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .react-flow__edge.animated path,
      .svelte-flow__edge.animated path {
        stroke-dasharray: 5 !important;
        stroke-dashoffset: 0 !important;
        animation: none !important;
      }
    `;

    document.head.appendChild(style);
  });
}

async function decodeImageToRawRgba(image: string | Uint8Array): Promise<{
  data: Uint8Array;
  width: number;
  height: number;
}> {
  const { data, info } = await sharp(image)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return {
    data,
    width: info.width,
    height: info.height,
  };
}

async function writeScreenshotIfChanged(
  outputPath: string,
  nextImageBuffer: Uint8Array,
  screenshotLabel: string,
): Promise<boolean> {
  const hasExistingFile = await fileExists(outputPath);
  if (!hasExistingFile) {
    await Fs.writeFile(outputPath, nextImageBuffer);
    return true;
  }

  try {
    const [existingImage, nextImage] = await Promise.all([
      decodeImageToRawRgba(outputPath),
      decodeImageToRawRgba(nextImageBuffer),
    ]);

    const sameSize =
      existingImage.width === nextImage.width &&
      existingImage.height === nextImage.height;

    if (!sameSize) {
      await Fs.writeFile(outputPath, nextImageBuffer);
      return true;
    }

    const changedPixels = blazediff(
      existingImage.data,
      nextImage.data,
      undefined,
      existingImage.width,
      existingImage.height,
      {
        threshold: 0,
        includeAA: true,
      },
    );

    if (changedPixels === 0) {
      return false;
    }

    console.log(`📸 Updated (diff ${changedPixels}px): ${screenshotLabel}`);
    await Fs.writeFile(outputPath, nextImageBuffer);
    return true;
  } catch (error) {
    console.log(`⚠️ Could not diff "${outputPath}", overwriting file instead.`, error);
    await Fs.writeFile(outputPath, nextImageBuffer);
    return true;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
  if (onlyMissing) {
    console.log('🔍 Scanning for missing preview images...');
  }
  console.log(`🌐 Waiting for server: ${baseUrl}`);
  await waitForServerReady(baseUrl);

  const browser: Browser = await puppeteer.launch({
    headless: false,
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
  });
  const page = await browser.newPage();

  // this is 16/6 aspect ratio like the preview images
  await page.setViewport({ width: 1024, height: 576 });

  await makeScreenshots(REACT_FLOW_EXAMPLES, '.react-flow', page);
  await makeScreenshots(SVELTE_FLOW_EXAMPLES, '.svelte-flow', page);

  await browser.close();

  if (onlyMissing) {
    console.log(
      `\n✅ Complete! Generated ${screenshotCount} missing screenshots, skipped ${skippedCount} existing ones.`,
    );
  } else {
    console.log(
      `\n✅ Complete! Updated ${screenshotCount} screenshots, skipped ${unchangedCount} unchanged screenshots.`,
    );
  }
}

main();
