import { SITE, canonical } from "./config";

export function renderAmpPage({
  title = SITE.name,
  description = SITE.description,
  slug = "",
  content = "",
  image = ""
}) {

  const url = canonical("/" + slug);
  const ogImage = image || SITE.domain + "/og/default";

  return `<!DOCTYPE html>
<html amp lang="id">

<head>

<meta charset="utf-8">

<title>${escapeHTML(title)}</title>

<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

<meta name="description" content="${escapeHTML(description)}">

<link rel="canonical" href="${url}">

<meta name="robots" content="index,follow,max-image-preview:large">

<meta property="og:type" content="article">
<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHTML(title)}">
<meta name="twitter:description" content="${escapeHTML(description)}">
<meta name="twitter:image" content="${ogImage}">

<script async src="https://cdn.ampproject.org/v0.js"></script>

<!-- =========================
SCHEMA BASIC AMP
========================= -->

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${escapeJSON(title)}",
  "description": "${escapeJSON(description)}",
  "image": "${ogImage}",
  "mainEntityOfPage": "${url}",
  "publisher": {
    "@type": "Organization",
    "name": "${SITE.name}"
  }
}
</script>

<style amp-custom>

/* =========================
PASTE TEMPLATE AMP KAMU DI SINI
========================= */

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #090909;
  color: #fff;
}

.wrap {
  max-width: 1000px;
  margin: auto;
  padding: 14px;
}

h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

a {
  color: #ffcc00;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* tambahan styling dari template kamu bisa di paste full di sini */

</style>

</head>

<body>

<div class="wrap">

<!-- CONTENT START -->

<h1>${escapeHTML(title)}</h1>

<div class="content">
${content}
</div>

<!-- CONTENT END -->

</div>

</body>

</html>`;
}

// ======================
// ESCAPE HTML
// ======================
function escapeHTML(str = "") {
  return String(str).replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[c]));
}

// ======================
// ESCAPE JSON (for schema safety)
// ======================
function escapeJSON(str = "") {
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ");
}
