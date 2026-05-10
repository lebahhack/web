export const SITE = {
  name: "LebahHack",
  url: "https://web.lebahhack.net",
  domain: "https://web.lebahhack.net",
  api_url: "https://web.lebahhack.workers.dev",
  description: "SEO Blog System Indonesia"
};

// ======================
// CANONICAL URL
// ======================
export function canonical(path = "") {
  return SITE.url + path;
}

// ======================
// SLUG SAFE
// ======================
export function sanitizeSlug(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ======================
// POST URL
// ======================
export function postUrl(post) {
  return (
    "/" +
    sanitizeSlug(post?.kategori || "") +
    "/" +
    sanitizeSlug(post?.slug || "")
  );
}

// ======================
// OG IMAGE (NO HARD DOMAIN USAGE OUTSIDE SITE)
// ======================
export function ogImage(slug = "") {
  const safeSlug = sanitizeSlug(slug);
  return `/og/${safeSlug}`;
}

// ======================
// TEXT UTILITIES
// ======================
export function stripHTML(html = "") {
  return String(html).replace(/<[^>]*>?/gm, "");
}

export function cleanDescription(str = "", max = 160) {
  return stripHTML(str)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

// ======================
// READING TIME
// ======================
export function readingTime(text = "") {
  const words = stripHTML(text).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
