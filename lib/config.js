export const SITE = {
  name: "LebahHack",
  domain: "https://web.lebahhack.net",
  description: "Portal artikel SEO, teknologi, dan tutorial modern Indonesia"
};

// ======================
// URL HELPERS
// ======================
export function canonical(path = "") {
  const base = SITE.domain.replace(/\/$/, "");
  if (!path) return base;
  return base + path;
}

// ======================
// SLUG CLEANER
// ======================
export function sanitizeSlug(str = "") {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ======================
// TEXT CLEAN (SEO SAFE)
// ======================
export function stripHTML(html = "") {
  return String(html).replace(/<[^>]*>?/gm, "");
}

export function cleanDescription(str = "", max = 160) {
  return String(str)
    .replace(/<[^>]*>?/gm, "")
    .replace(/\s+/g, " ")
    .replace(/["']/g, "")
    .trim()
    .slice(0, max);
}

// ======================
// READING TIME
// ======================
export function readingTime(text = "") {
  const words = stripHTML(text).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ======================
// IMAGE HELPERS
// ======================
export function postImage(src = "", alt = "") {
  return `<img src="${src}" alt="${escapeHTML(alt)}" loading="lazy">`;
}

export function cardImage(src = "", alt = "") {
  return `<img src="${src}" alt="${escapeHTML(alt)}" loading="lazy">`;
}

// ======================
// BASIC ESCAPE
// ======================
export function escapeHTML(str = "") {
  return String(str).replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[c]));
}

// ======================
// OPTIONAL HELPER (SAFE URL POST)
// ======================
export function postUrl(slug = "") {
  if (!slug) return "/";
  return "/" + sanitizeSlug(slug);
}
