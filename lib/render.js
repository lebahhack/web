import { SITE, canonical } from "./config";

export const layout = ({
  title = SITE.name,
  description = SITE.description,
  canonical: canonicalPath = "",
  image = "",
  schema = "",
  content = ""
}) => {

  const url = canonical(canonicalPath || "/");

  const ogImage = image || SITE.domain + "/og/default";

  return new Response(`
<!DOCTYPE html>
<html lang="id">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${escapeHTML(title)}</title>

<meta name="description" content="${escapeHTML(description)}">

<link rel="canonical" href="${url}">

<meta name="robots" content="index,follow,max-image-preview:large">

<meta property="og:type" content="article">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHTML(title)}">
<meta name="twitter:description" content="${escapeHTML(description)}">
<meta name="twitter:image" content="${ogImage}">

<link rel="sitemap" href="${SITE.domain}/sitemap.xml">
<link rel="alternate" type="application/rss+xml" href="${SITE.domain}/rss.xml">

${schema || ""}

<style>

/* ======================
BASIC CLEAN STYLE
====================== */

body {
  margin: 0;
  font-family: system-ui, Arial, sans-serif;
  background: #fff;
  color: #111;
  line-height: 1.7;
}

.container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

a {
  color: #4f46e5;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.post h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

.post-content {
  font-size: 17px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 15px;
  margin-top: 30px;
}

.card {
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 10px;
}

.card h4 {
  font-size: 15px;
  margin: 0;
}

</style>

</head>

<body>

<div class="container">

${content}

</div>

</body>

</html>
`,
  {
    headers: {
      "content-type": "text/html;charset=UTF-8",
      "cache-control": "public,max-age=300"
    }
  });

};

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
