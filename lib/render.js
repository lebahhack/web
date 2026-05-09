import { SITE } from "./config";

export const layout = ({
  title = SITE.name,
  description = SITE.description,
  canonical = "",
  schema = "",
  content = ""
}) => {

  const url = canonical || SITE.domain;

  return new Response(`<!DOCTYPE html>
<html lang="id">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>${escapeHTML(title)}</title>

<meta name="description" content="${escapeHTML(description)}">

<link rel="canonical" href="${url}">

<meta name="robots" content="index,follow">

<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">

<meta name="twitter:card" content="summary_large_image">

${schema || ""}

<style>

/* =========================
BASE TEMPLATE STYLE (KAMU)
========================= */

body{
margin:0;
font-family:Arial,sans-serif;
background:#090909;
color:#fff;
}

a{
text-decoration:none;
color:inherit;
}

.container{
max-width:1000px;
margin:auto;
padding:14px;
}

/* =========================
GRID (SESUAI TEMPLATE 5 COL)
========================= */

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
color:#fff;
}

/* =========================
POST STYLE
========================= */

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

/* =========================
RESPONSIVE
========================= */

@media(max-width:900px){
.grid{
grid-template-columns:repeat(3,1fr);
}
}

@media(max-width:600px){
.grid{
grid-template-columns:repeat(2,1fr);
}
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
