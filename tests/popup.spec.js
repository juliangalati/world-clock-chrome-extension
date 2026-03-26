// @ts-check
const { test, expect, chromium } = require('@playwright/test');
const path = require('path');

const EXTENSION_PATH = path.resolve(__dirname, '..');
const CHROME_EXECUTABLE =
  '/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

/** @type {import('@playwright/test').BrowserContext} */
let context;
/** @type {string} */
let extensionId;

test.beforeAll(async () => {
  context = await chromium.launchPersistentContext('', {
    executablePath: CHROME_EXECUTABLE,
    headless: false, // extensions require headed mode
    args: [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`,
      '--no-sandbox',
    ],
  });

  // Resolve extension ID from the service worker URL
  let [background] = context.serviceWorkers();
  if (!background) {
    background = await context.waitForEvent('serviceworker');
  }
  extensionId = background.url().split('/')[2];
});

test.afterAll(async () => {
  await context.close();
});

test('popup renders local and Madrid clocks', async () => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);

  // Local clock label should show the local timezone city name (not "--")
  const localLabel = page.locator('#local-label');
  await expect(localLabel).not.toHaveText('Local'); // replaced by JS
  await expect(localLabel).toBeVisible();

  // Madrid label (has a ▾ suffix)
  await expect(page.locator('.label').nth(1)).toContainText('Madrid');

  // Times should be populated (HH:MM:SS pattern)
  const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
  await expect(page.locator('#local-time')).toHaveText(timeRegex);
  await expect(page.locator('#second-time')).toHaveText(timeRegex);

  // Dates should be populated (e.g. "Wed, 25 Mar")
  await expect(page.locator('#local-date')).not.toBeEmpty();
  await expect(page.locator('#second-date')).not.toBeEmpty();
});

test('clock updates every second', async () => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);

  const firstTime = await page.locator('#local-time').textContent();
  // Wait just over 1 second for the interval to fire
  await page.waitForTimeout(1100);
  const secondTime = await page.locator('#local-time').textContent();

  expect(firstTime).not.toEqual(secondTime);
});

test('tooltip updates immediately when timezone is changed', async () => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);

  // Trigger a timezone change to Tokyo via the select
  await page.evaluate(() => {
    const sel = document.getElementById('tz-select');
    sel.value = 'Asia/Tokyo';
    sel.dispatchEvent(new Event('change'));
  });

  // Give the storage change time to propagate to the background service worker
  await page.waitForTimeout(500);

  const title = await page.evaluate(() => chrome.action.getTitle({}));
  expect(title).toContain('Tokyo');

  // Restore Madrid for other tests
  await page.evaluate(() => {
    const sel = document.getElementById('tz-select');
    sel.value = 'Europe/Madrid';
    sel.dispatchEvent(new Event('change'));
  });
  await page.waitForTimeout(500);
});

test('Madrid time is different from local time (unless you are in Madrid)', async () => {
  const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  test.skip(localTZ === 'Europe/Madrid', 'Running in Madrid timezone — times will match');

  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);

  const localTime = await page.locator('#local-time').textContent();
  const secondTime = await page.locator('#second-time').textContent();

  expect(localTime).not.toEqual(secondTime);
});
