/**
 * Pure Antigravity token JSON detection utilities.
 *
 * Client-safe: ZERO imports from database, Node I/O, or server services.
 * Safe to import in "use client" components (e.g. OAuthModal).
 */

/**
 * True if the pasted text looks like an Antigravity CLI token file (either the
 * nested `.token` shape or the flat `oauth_creds.json` shape with access_token
 * and refresh_token) vs a bare token or callback URL.
 */
export function looksLikeAgyTokenJson(value: string): boolean {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed.startsWith("{")) return false;
  try {
    const doc = JSON.parse(trimmed);
    if (!doc || typeof doc !== "object" || Array.isArray(doc)) return false;
    const rec = doc as Record<string, unknown>;
    const token =
      rec.token && typeof rec.token === "object" && !Array.isArray(rec.token)
        ? (rec.token as Record<string, unknown>)
        : rec;
    return (
      typeof token.access_token === "string" &&
      token.access_token.trim().length > 0 &&
      typeof token.refresh_token === "string" &&
      token.refresh_token.trim().length > 0
    );
  } catch {
    return false;
  }
}
