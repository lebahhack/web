import { SITE, canonical, sanitizeSlug, ogImage as buildOg } from "./config";

// ======================
// SEO ENGINE (SAFE)
// ======================
export function seo({
  title,
  description,
  post = null,
  slug = "",
  image = "",
  type = "article",
  robots = "index,follow"
}) {

  const safeSite = SITE || { name: "SITE", description: "" };

  const safeTitle = title || safeSite.name;
  const safeDesc = description || safeSite.description;

  const kategori = post?.kategori || "";
  const postSlug = post?.slug || "";

  const path = post
    ? "/" + sanitizeSlug(kategori) + "/" + sanitizeSlug(postSlug)
    : (slug ? "/" + sanitizeSlug(slug) : "/");

  const url = canonical ? canonical(path) : path;

  const og = image || (buildOg ? buildOg(postSlug || slug) : "");

  const meta = `
<title>${escapeHTML(safeTitle)}</title>

<meta name="description" content="${escapeHTML(safeDesc)}">
<meta name="robots" content="${robots}">

<link rel="canonical" href="${url}">

<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${safeSite.name}">
<meta property="og:title" content="${escapeHTML(safeTitle)}">
<meta property="og:description" content="${escapeHTML(safeDesc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHTML(safeTitle)}">
<meta name="twitter:description" content="${escapeHTML(safeDesc)}">
<meta name="twitter:image" content="${og}">
`;

  const schema = {
    "@context": "https://schema.org",
    "@type": type === "website" ? "WebSite" : "BlogPosting",
    headline: safeTitle,
    description: safeDesc,
    url: url,
    image: og,
    publisher: {
      "@type": "Organization",
      name: safeSite.name
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
// SAFE HTML ESCAPE
// ======================
function escapeHTML(str = "") {
  return String(str).replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[c]));
}
