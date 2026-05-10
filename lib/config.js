export const SITE = {
  name: "LebahHack",
  domain: "https://web.lebahhack.net",
  api_url: "https://web.lebahhack.workers.dev",
  description: "SEO Blog System Indonesia"
};

// ======================
// CANONICAL (SAFE)
// ======================
export function canonical(path = "") {
  if (!path) return SITE.domain;
  return SITE.domain + (path.startsWith("/") ? path : "/" + path);
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
// STRIP HTML
// ======================
export function stripHTML(html = "") {
  return String(html).replace(/<[^>]*>?/gm, "");
}

// ======================
// DESCRIPTION CLEAN
// ======================
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

// ======================
// POST URL (NON AMP)
// ======================
export function postUrl(post) {
  if (!post?.slug) return "/";
  return "/" + sanitizeSlug(post.slug);
}

// ======================
// AMP URL (INI YANG PENTING)
// ======================
export function ampUrl(post) {
  if (!post?.slug) return "/";
  return "/amp/" + sanitizeSlug(post.slug);
}

// ======================
// OG IMAGE SAFE
// ======================
export function ogImage(slug = "") {
  const safe = sanitizeSlug(slug);
  return SITE.domain + "/og/" + (safe || "default");
}
