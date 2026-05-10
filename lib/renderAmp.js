export function renderAmp({
  title = "",
  description = "",
  image = "",
  canonical = "",
  content = "",
  schema = ""
}) {
  return `<!doctype html>
<html amp lang="id">

<head>
<meta charset="utf-8">
<script async src="https://cdn.ampproject.org/v0.js"></script>

<title>${title}</title>

<meta name="description" content="${description}">

<link rel="canonical" href="${canonical}">

<!-- ======================
OPEN GRAPH
====================== -->
<meta property="og:type" content="article">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:url" content="${canonical}">

<!-- ======================
TWITTER CARD
====================== -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">

<!-- ======================
JSON-LD SEO
====================== -->
${schema || defaultSchema(title, description, url)}

<style amp-custom>
body{
  font-family:Arial;
  background:#0b0b0b;
  color:#fff;
  margin:0;
  padding:16px;
}

img,amp-img{
  max-width:100%;
}
</style>

</head>

<body>

${content}

</body>
</html>`;
}
