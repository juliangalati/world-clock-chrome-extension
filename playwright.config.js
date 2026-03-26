// @ts-check
const { defineConfig } = require('@playwright/test');
const path = require('path');

const EXTENSION_PATH = path.resolve(__dirname);
const CHROME_EXECUTABLE = '/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

module.exports = defineConfig({
  testDir: './tests',
  use: {
    browserName: 'chromium',
    channel: undefined, // using executablePath instead
  },
  projects: [
    {
      name: 'chrome-extension',
      use: {
        browserName: 'chromium',
        executablePath: CHROME_EXECUTABLE,
        args: [
          `--disable-extensions-except=${EXTENSION_PATH}`,
          `--load-extension=${EXTENSION_PATH}`,
          '--no-sandbox',
        ],
        // Extensions require a persistent context
        // Tests use chromiumSandbox: false for stability
        chromiumSandbox: false,
      },
    },
  ],
});
