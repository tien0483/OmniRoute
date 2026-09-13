// src/lib/db/adapters/runtimeRequire.ts
/**
 * Load optional database drivers from the runtime rather than bundling them.
 *
 * The standalone server is emitted as CommonJS chunks and externalizes the
 * native database packages. Keep those requests as static `require()` calls so
 * webpack preserves the external boundary. Development and tests run as ESM,
 * where `require` is unavailable; the `createRequire(import.meta.url)` fallback
 * handles those callers.
 */
import * as nodeModule from "node:module";

const esmRequire = nodeModule.createRequire(import.meta.url);

function esmRuntimeRequire(specifier: string): unknown {
  switch (specifier) {
    case "better-sqlite3":
      return esmRequire("better-sqlite3");
    case "node:sqlite":
      return esmRequire("node:sqlite");
    case "bun:sqlite":
      return esmRequire("bun:sqlite");
    case "sql.js":
      return esmRequire("sql.js");
    case "sqlite-vec":
      return esmRequire("sqlite-vec");
    default:
      throw new Error(`Unsupported runtime require: ${specifier}`);
  }
}

export function runtimeRequire(specifier: string): unknown {
  const isCjs = typeof module !== "undefined" && typeof module.require === "function";
  if (isCjs) {
    const req = module.require;
    switch (specifier) {
      case "better-sqlite3":
        return req("better-sqlite3");
      case "node:sqlite":
        return req("node:sqlite");
      case "bun:sqlite":
        return req("bun:sqlite");
      case "sql.js":
        return req("sql.js");
      case "sqlite-vec":
        return req("sqlite-vec");
    }
  }

  return esmRuntimeRequire(specifier);
}
