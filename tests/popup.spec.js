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

  // Madrid label
  await expect(page.locator('.label').nth(1)).toHaveText('Madrid');

  // Times should be populated (HH:MM:SS pattern)
  const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
  await expect(page.locator('#local-time')).toHaveText(timeRegex);
  await expect(page.locator('#madrid-time')).toHaveText(timeRegex);

  // Dates should be populated (e.g. "Wed, 25 Mar")
  await expect(page.locator('#local-date')).not.toBeEmpty();
  await expect(page.locator('#madrid-date')).not.toBeEmpty();
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

test('Madrid time is different from local time (unless you are in Madrid)', async () => {
  const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  test.skip(localTZ === 'Europe/Madrid', 'Running in Madrid timezone — times will match');

  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);

  const localTime = await page.locator('#local-time').textContent();
  const madridTime = await page.locator('#madrid-time').textContent();

  expect(localTime).not.toEqual(madridTime);
});
