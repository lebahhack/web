import { SITE } from "./config";

export const renderAmp = ({
  title = SITE.name,
  description = SITE.description,
  canonical = "",
  content = ""
}) => {

  const url = canonical || SITE.domain;

  return `<!DOCTYPE html>
<html amp lang="id">

<head>

<meta charset="utf-8">

<title>${escapeHTML(title)}</title>

<meta name="viewport"
content="width=device-width,minimum-scale=1,initial-scale=1">

<meta name="description"
content="${escapeHTML(description)}">

<link rel="canonical"
href="${url}">

<meta name="robots"
content="index,follow,max-image-preview:large">

<meta property="og:type"
content="website">

<meta property="og:title"
content="${escapeHTML(title)}">

<meta property="og:description"
content="${escapeHTML(description)}">

<meta property="og:url"
content="${url}">

<meta name="twitter:card"
content="summary_large_image">

<script async
src="https://cdn.ampproject.org/v0.js"></script>

<!-- SCHEMA WEBSITE -->
<script type="application/ld+json">
{
"@context":"https://schema.org",
"@type":"WebSite",
"name":"${SITE.name}",
"url":"${SITE.domain}"
}
</script>

<script type="application/ld+json">
{
"@context":"https://schema.org",
"@type":"Organization",
"name":"${SITE.name}",
"url":"${SITE.domain}",
"logo":"${SITE.domain}/logo.png"
}
</script>

<style amp-custom>

/* =========================
ROOT (TEMPLATE KAMU FULL)
========================= */

:root{

--bg:#090909;
--bg2:#0d0d0d;
--bg3:#111;
--bg4:#1a0000;

--border:#222;
--border-red:#ff2a00;

--white:#fff;
--text:#ddd;
--muted:#999;

--gold:#ffcc00;
--gold2:#ffb400;

--red:#d10000;

--radius:10px;
--radius2:30px;

--shadow-red:
0 0 20px rgba(255,0,0,.5);

--shadow-gold:
0 0 12px rgba(255,180,0,.6);

--font:Arial,sans-serif;

}

body{
margin:0;
background:var(--bg);
font-family:var(--font);
color:var(--white);
line-height:1.4;
overflow-x:hidden;
}

a{
text-decoration:none;
color:var(--white);
}

.wrap{
width:100%;
max-width:1000px;
margin:auto;
padding:0 14px;
box-sizing:border-box;
}

/* =========================
GRID TEMPLATE KAMU
========================= */

.grid{
display:grid;
grid-template-columns:repeat(5,1fr);
gap:10px;
}

.card{
background:var(--bg4);
border:1px solid var(--border-red);
border-radius:8px;
overflow:hidden;
text-align:center;
}

.card a{
display:block;
padding:8px;
font-size:11px;
font-weight:700;
}

.card span{
display:block;
padding-bottom:8px;
font-size:10px;
color:#ccc;
}

/* =========================
POST STYLE
========================= */

.post{
margin-top:20px;
padding:10px;
}

.post h1{
font-size:28px;
color:var(--gold);
text-align:center;
}

.post-content{
font-size:14px;
line-height:1.8;
color:var(--text);
}

.content{
text-align:center;
padding:15px;
font-size:13px;
color:var(--muted);
}

.footer{
text-align:center;
padding:20px;
font-size:11px;
color:#666;
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
© ${new Date().getFullYear()} ${SITE.name}
</div>

</div>

</body>
</html>`;
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
