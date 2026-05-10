import {
SITE,
url as buildUrl,
amphtml,
escapeHTML
} from "./config";

export function layout({
title = SITE.name,
description = SITE.description,
canonical = "",
image = "",
schema = "",
robots = "",
content = ""
}) {

const canonicalUrl = canonical || SITE.domain;
const ampUrl = amphtml(canonicalUrl.replace(SITE.domain, ""));
const ogImage = image || buildUrl(SITE.defaultImage);

return new Response(`<!doctype html>
<html lang="id">
<head>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>${escapeHTML(title)}</title>
<meta name="description" content="${escapeHTML(description)}">

<!-- SEO CORE -->
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<meta name="googlebot" content="index,follow">
<meta name="theme-color" content="#0f172a">

<!-- LANGUAGE -->
<meta name="language" content="id-ID">
<meta http-equiv="content-language" content="id">

<!-- CANONICAL -->
<link rel="canonical" href="${canonicalUrl}">
<link rel="amphtml" href="${ampUrl}">

<!-- PRECONNECT (CWV BOOST) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- OPEN GRAPH -->
<meta property="og:type" content="article">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:image" content="${ogImage}">

<!-- TWITTER -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHTML(title)}">
<meta name="twitter:description" content="${escapeHTML(description)}">
<meta name="twitter:image" content="${ogImage}">

<!-- FEEDS -->
<link rel="sitemap" href="${SITE.domain}/sitemap.xml">
<link rel="alternate" type="application/rss+xml" href="${SITE.domain}/rss.xml">

${robots || ""}
${schema || ""}

<style>

:root{
--bg:#0f172a;
--card:#111827;
--text:#e5e7eb;
--muted:#94a3b8;
--primary:#6366f1;
--border:#1e293b;
--radius:14px;
}

/* RESET */
*{
box-sizing:border-box;
}

body{
margin:0;
font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
background:var(--bg);
color:var(--text);
line-height:1.75;
-webkit-font-smoothing:antialiased;
text-rendering:optimizeLegibility;
}

/* LINKS */
a{
color:var(--primary);
text-decoration:none;
}

/* IMAGE OPT */
img{
max-width:100%;
height:auto;
display:block;
}

/* HEADER */
.header{
position:sticky;
top:0;
z-index:99;
padding:14px 18px;
background:rgba(15,23,42,.9);
backdrop-filter:blur(8px);
border-bottom:1px solid var(--border);
}

/* CONTAINER */
.container{
max-width:760px;
margin:auto;
padding:18px;
}

/* HERO */
.hero{
padding:56px 20px;
border-radius:var(--radius);
background:linear-gradient(135deg,#4f46e5,#6366f1);
text-align:center;
margin-bottom:26px;
}

.hero h1{
margin:0 0 10px;
font-size:34px;
color:#fff;
}

.hero p{
margin:0;
color:#e0e7ff;
}

/* ARTICLE WRAPPER (IMPORTANT SEO SIGNAL) */
.article{
background:var(--card);
border:1px solid var(--border);
border-radius:var(--radius);
padding:22px;
margin:20px 0;
}

/* TYPOGRAPHY */
h1,h2,h3{
line-height:1.3;
}

p{
color:var(--muted);
}

/* GRID (SAFE RESPONSIVE FIX) */
.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
gap:12px;
margin:20px 0;
}

.card{
background:var(--card);
border:1px solid var(--border);
border-radius:12px;
padding:14px;
text-align:center;
}

/* FOOTER */
.footer{
margin-top:50px;
padding:30px 18px;
text-align:center;
font-size:13px;
color:var(--muted);
border-top:1px solid var(--border);
}

/* MOBILE OPT */
@media(max-width:768px){
.hero h1{font-size:26px;}
.container{padding:14px;}
}

</style>

</head>

<body>

<header class="header">
<strong>${SITE.name}</strong>
</header>

<main class="container">

${content}

</main>

<footer class="footer">
© ${new Date().getFullYear()} ${SITE.name}
</footer>

</body>
</html>`, {
headers: {
"content-type": "text/html;charset=UTF-8",
"cache-control": "public,max-age=300"
}
});
}
