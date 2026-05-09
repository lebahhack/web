export function renderAmp({
  title = "Website",
  description = "Description",
  canonical = "",
  content = "",
  siteName = "Site"
}) {

  const url = canonical || "";

  return `<!DOCTYPE html>
<html amp lang="id">

<head>
<meta charset="utf-8">

<title>${escapeHTML(title)}</title>

<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

<meta name="description" content="${escapeHTML(description)}">

<link rel="canonical" href="${url}">

<meta name="robots" content="index,follow,max-image-preview:large">

<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${url}">

<meta name="twitter:card" content="summary_large_image">

<script async src="https://cdn.ampproject.org/v0.js"></script>

<!-- BASIC SCHEMA -->
<script type="application/ld+json">
{
"@context":"https://schema.org",
"@type":"WebSite",
"name":"${siteName}",
"url":"${url}"
}
</script>

<style amp-custom>

/* =========================
BASIC AMP TEMPLATE (SAFE)
========================= */

body{
margin:0;
font-family:Arial,sans-serif;
background:#090909;
color:#fff;
line-height:1.5;
}

.wrap{
max-width:1000px;
margin:auto;
padding:14px;
}

/* GRID */
.grid{
display:grid;
grid-template-columns:repeat(5,1fr);
gap:10px;
}

/* CARD */
.card{
background:#1a0000;
border:1px solid #ff2a00;
border-radius:8px;
overflow:hidden;
text-align:center;
}

.card a{
display:block;
padding:8px;
font-size:11px;
color:#fff;
font-weight:700;
}

/* POST */
.post h1{
color:#ffcc00;
font-size:26px;
text-align:center;
}

.post-content{
font-size:14px;
color:#ddd;
line-height:1.8;
}

/* FOOTER */
.footer{
text-align:center;
font-size:11px;
color:#666;
margin-top:20px;
}

@media(max-width:900px){
.grid{grid-template-columns:repeat(3,1fr);}
}

@media(max-width:600px){
.grid{grid-template-columns:repeat(2,1fr);}
}

</style>

</head>

<body>

<div class="wrap">

${content}

<div class="footer">
© ${new Date().getFullYear()} ${siteName}
</div>

</div>

</body>
</html>`;
}

// ======================
// SAFE HTML
// ======================
function escapeHTML(str = "") {
  return String(str).replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[c]));
}
