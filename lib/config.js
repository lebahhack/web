// ======================
// SITE CONFIG
// ======================
export const SITE = {
  name: "LebahHack",
  domain: "https://web.lebahhack.net",
  api_url: "https://api.lebahhack.workers.dev",
  data_url: "",
  description: "Blog SEO modern"
};

// ======================
// URL HELPERS
// ======================
export function canonical(path = "") {
  return SITE.domain + path;
}

export function postUrl(post) {
  return "/" + sanitizeSlug(post.kategori) + "/" + sanitizeSlug(post.slug);
}

// ======================
// SLUG CLEANER
// ======================
export function sanitizeSlug(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ======================
// DESCRIPTION CLEANER
// ======================
export function stripHTML(html = "") {
  return String(html).replace(/<[^>]*>?/gm, "");
}

export function cleanDescription(str = "", max = 160) {
  return stripHTML(str)
    .replace(/\s+/g, " ")
    .replace(/"/g, "")
    .trim()
    .slice(0, max);
}

// ======================
// READING TIME
// ======================
export function readingTime(text = "") {
  const words = stripHTML(text).split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// ======================
// OG IMAGE
// ======================
export function ogImage(slug = "") {
  return SITE.domain + "/og/" + sanitizeSlug(slug);
}

// ======================
// CARD IMAGE
// ======================
export function cardImage(src, alt = "") {
  return `<img src="${src}" alt="${alt}">`;
}
