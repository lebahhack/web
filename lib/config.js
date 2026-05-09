export const SITE = {
  name: "LebahHack",
  domain: "https://web.lebahhack.net",
  api_url: "https://api.lebahhack.workers.dev",
  description: "SEO Blog System"
};

export function canonical(path = "") {
  return SITE.domain + path;
}

export function sanitizeSlug(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function stripHTML(html = "") {
  return String(html).replace(/<[^>]*>?/gm, "");
}

export function cleanDescription(str = "", max = 160) {
  return stripHTML(str)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function readingTime(text = "") {
  const words = stripHTML(text).split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function postUrl(post) {
  return "/" + sanitizeSlug(post.kategori) + "/" + sanitizeSlug(post.slug);
}

export function ogImage(slug = "") {
  return SITE.domain + "/og/" + sanitizeSlug(slug);
}
