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
body{
margin:0;
font-family:Arial,sans-serif;
background:#090909;
color:#fff;
}

a{color:inherit;text-decoration:none;}

.container{
max-width:1000px;
margin:auto;
padding:14px;
}

.grid{
display:grid;
grid-template-columns:repeat(5,1fr);
gap:10px;
}

.card{
background:#1a0000;
border:1px solid #ff2a00;
border-radius:8px;
overflow:hidden;
text-align:center;
}

.card img{
width:100%;
height:120px;
object-fit:cover;
}

.card h3,.card h4{
font-size:11px;
margin:0;
padding:8px;
}

.post{
max-width:800px;
margin:auto;
padding:10px;
}

.post h1{
font-size:28px;
color:#ffcc00;
}

.post-content{
font-size:14px;
line-height:1.8;
color:#ddd;
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
