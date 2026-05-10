import { SITE, canonical, sanitizeSlug, ogImage as buildOg } from "./config";

// ======================
// SEO ENGINE
// ======================
export function seo({
  title = SITE?.name || "Site",
  description = SITE?.description || "",
  post = null,
  slug = "",
  image = "",
  type = "article",
  robots = "index,follow"
}) {
  

  const safeSiteName = SITE?.name || "Site";

  const path = post
    ? "/" + sanitizeSlug(post?.kategori || "") + "/" + sanitizeSlug(post?.slug || "")
    : (slug ? "/" + sanitizeSlug(slug) : "/");

  const url = canonical ? canonical(path) : path;

  const og = getOgImage({ image, post, slug });

  const meta = `
<title>${escapeHTML(title)}</title>

<meta name="description" content="${escapeHTML(description)}">
<meta name="robots" content="${robots}">

<link rel="canonical" href="${url}">

<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${safeSiteName}">
<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHTML(title)}">
<meta name="twitter:description" content="${escapeHTML(description)}">
<meta name="twitter:image" content="${og}">
`;

  const schema = {
    "@context": "https://schema.org",
    "@type": type === "website" ? "WebSite" : "BlogPosting",
    headline: title,
    description: description,
    url: url,
    image: og,
    publisher: {
      "@type": "Organization",
      name: safeSiteName
    }
  };

  return `
${meta}

<script type="application/ld+json">
${JSON.stringify(schema)}
</script>
`;
}

// ======================
// OG IMAGE SINGLE SOURCE
// ======================
export function getOgImage({ image, post, slug }) {
  return image || buildOg(post?.slug || slug);
}

// ======================
// ESCAPE SAFE HTML
// ======================
function escapeHTML(str = "") {
  return String(str).replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[c]));
}
