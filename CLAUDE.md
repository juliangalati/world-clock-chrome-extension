# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A browser extension that displays world clocks for multiple time zones.

## Commands

_This project has not been initialized yet. Update this section once a build system is in place._

Typical commands for a browser extension with a JS bundler:

```bash
npm install        # Install dependencies
npm run build      # Build the extension
npm run dev        # Watch mode / dev build
npm run lint       # Lint source files
npm test           # Run tests
```

## Loading the Extension (Chrome)

1. Build the project (`npm run build`)
2. Open `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist/` (or project root) directory

## Architecture

_Populate this section as the project is built out._

Key files for a browser extension:

- `manifest.json` — Extension manifest (permissions, entry points, version)
- `popup/` — UI shown when the extension icon is clicked
- `background/` — Service worker / background script (alarms, storage sync)
- `content/` — Content scripts injected into web pages (if needed)

Typical data flow: popup reads saved time zones from `chrome.storage.sync`, renders clocks using the browser's `Intl.DateTimeFormat` API, and lets users add/remove/reorder zones which are persisted back to storage.

## Chrome Usage

Always use **Google Chrome for Testing.app** when running, opening, or inspecting this extension. Never use regular Chrome.

- Executable: `/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
