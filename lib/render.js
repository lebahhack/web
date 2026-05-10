import { SITE } from "./config";

export const layout = ({
  title = SITE.name,
  description = SITE.description,
  canonical = "",
  image = "",
  schema = "",
  content = ""
}) => {

  const url = canonical
    ? (canonical.startsWith("http") ? canonical : SITE.domain + canonical)
    : SITE.domain;

  const ogImage = image || SITE.domain + "/og.jpg";

  return new Response(`<!DOCTYPE html>
<html lang="id">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>${escapeHTML(title)}</title>
<meta name="description" content="${escapeHTML(description)}">

<link rel="canonical" href="${url}">

<meta name="robots" content="index,follow">

<!-- OPEN GRAPH -->
<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${escapeHTML(ogImage)}">
<meta property="og:type" content="article">

<!-- TWITTER -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHTML(title)}">
<meta name="twitter:description" content="${escapeHTML(description)}">
<meta name="twitter:image" content="${escapeHTML(ogImage)}">

${schema || defaultSchema(title, description, url)}

<style>
/* =========================
MODERN BLOG UI
========================= */

.hero{
text-align:center;
padding:30px 15px;
background:linear-gradient(135deg,#120000,#000);
border:1px solid #ff2a00;
border-radius:12px;
margin-bottom:20px;
}

.hero h1{
font-size:28px;
color:#ffcc00;
margin:0;
}

.hero p{
opacity:.8;
font-size:14px;
}

.hero-search input{
margin-top:10px;
width:100%;
max-width:400px;
padding:10px;
border-radius:8px;
border:1px solid #ff2a00;
background:#000;
color:#fff;
}

/* =========================
CARD UPGRADE
========================= */

.grid{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:12px;
}

.card{
display:block;
background:#0d0d0d;
border:1px solid rgba(255,42,0,.2);
border-radius:12px;
overflow:hidden;
transition:.2s;
color:#fff;
}

.card:hover{
transform:translateY(-4px);
border-color:#ff2a00;
}

.thumb img{
width:100%;
height:140px;
object-fit:cover;
display:block;
}

.card-body{
padding:10px;
}

.card h3{
font-size:13px;
margin:0;
line-height:1.4;
}

.meta{
font-size:11px;
opacity:.6;
}

/* =========================
RESPONSIVE
========================= */

@media(max-width:900px){
.grid{grid-template-columns:repeat(2,1fr);}
}

@media(max-width:600px){
.grid{grid-template-columns:1fr;}
}
</style>

</head>

<body>

<div class="container">
${content}
</div>

</body>
</html>`, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
      "cache-control": "public,max-age=300"
    }
  });
};

// ======================
// DEFAULT SCHEMA (SAFE SEO)
// ======================
function defaultSchema(title, description, url) {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "${SITE.name}",
  "url": "${SITE.domain}",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "${SITE.domain}/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>`;
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
