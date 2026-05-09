import { SITE, canonical } from "./config";

export const layout = ({
  title = SITE.name,
  description = SITE.description,
  canonical: canon = "",
  image = "",
  schema = "",
  content = ""
}) => {

  const url = canon || SITE.domain;
  const og = image || SITE.domain + "/og/default";

  return new Response(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>${escapeHTML(title)}</title>

<meta name="description" content="${escapeHTML(description)}">

<link rel="canonical" href="${url}">

<meta property="og:type" content="article">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">

<meta name="twitter:card" content="summary_large_image">

${schema || ""}

<style>
body{font-family:system-ui;margin:0;padding:20px}
.container{max-width:1000px;margin:auto}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}
.card{border:1px solid #ddd;padding:10px;border-radius:10px}
a{text-decoration:none;color:inherit}
</style>

</head>

<body>

<div class="container">

${content}

</div>

</body>
</html>`, {
    headers: {
      "content-type": "text/html;charset=UTF-8"
    }
  });
};

// ======================
// SAFE ESCAPE
// ======================
function escapeHTML(str = "") {
  return String(str).replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[c]));
}
