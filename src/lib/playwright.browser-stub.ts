/**
 * playwright.browser-stub.ts
 *
 * Browser-side stub for playwright and playwright-core.
 *
 * playwright and playwright-core are Node.js-only packages that use async_hooks
 * (a Node built-in) internally. When Turbopack traces the browser bundle it can
 * reach these packages transitively via server-side modules if accidentally imported.
 *
 * The turbopack.resolveAlias in next.config.mjs redirects both `playwright` and
 * `playwright-core` to this stub for the browser build. The actual server-side
 * browser pool (browserPool.ts) only ever runs in a Node.js environment, so the
 * stub is never reached at runtime.
 */

export const chromium = {
  launch: () => Promise.reject(new Error("playwright is not available in the browser")),
};
export const firefox = {
  launch: () => Promise.reject(new Error("playwright is not available in the browser")),
};
export const webkit = {
  launch: () => Promise.reject(new Error("playwright is not available in the browser")),
};

export default { chromium, firefox, webkit };
