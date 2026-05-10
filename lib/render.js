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

<link rel="canonical" href="${canonicalUrl}">
<link rel="amphtml" href="${ampUrl}">

<meta name="robots" content="index,follow,max-image-preview:large">

<meta name="theme-color" content="#0b0f19">

<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:image" content="${ogImage}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:type" content="article">

<style>

/* ================= ROOT ================= */
:root{
--bg:#0b0f19;
--card:#141a2a;
--soft:#1b2236;
--text:#e5e7eb;
--muted:#94a3b8;
--primary:#3fc402;
--radius:16px;
}

/* ================= BASE ================= */
body{
margin:0;
font-family:system-ui,-apple-system,Segoe UI,Roboto;
background:var(--bg);
color:var(--text);
}

a{text-decoration:none;color:inherit}

.container{
max-width:860px;
margin:auto;
padding:16px;
}

/* ================= HEADER (GLASS MODERN) ================= */
.header{
position:sticky;
top:0;
z-index:100;
display:flex;
justify-content:space-between;
align-items:center;
padding:14px 18px;

background:rgba(11,15,25,.7);
backdrop-filter:blur(12px);
border-bottom:1px solid rgba(255,255,255,0.06);
}

.logo{
font-weight:700;
font-size:18px;
letter-spacing:.5px;
}

.menu-btn{
font-size:22px;
background:none;
border:none;
color:#fff;
cursor:pointer;
}

/* ================= SIDEBAR ================= */
.sidebar{
position:fixed;
top:0;
right:-100%;
width:280px;
height:100%;
background:var(--card);
transition:.3s;
padding:20px;
z-index:200;
}

.sidebar.active{
right:0;
}

.sidebar a{
display:block;
padding:12px 0;
border-bottom:1px solid rgba(255,255,255,0.05);
color:var(--text);
}

.close{
text-align:right;
font-size:20px;
cursor:pointer;
}

/* ================= HERO MODERN ================= */
.hero{
margin-top:10px;
border-radius:var(--radius);
overflow:hidden;
position:relative;
}

.hero img{
width:100%;
height:320px;
object-fit:cover;
filter:brightness(.6);
}

.hero-content{
position:absolute;
inset:0;
display:flex;
flex-direction:column;
justify-content:center;
padding:20px;
background:linear-gradient(90deg,rgba(0,0,0,.85),rgba(0,0,0,.3));
}

.hero h1{
font-size:28px;
margin:0 0 8px;
}

.hero p{
color:var(--muted);
}

/* ================= BUTTON ================= */
.btn-group{
display:flex;
gap:10px;
margin-top:12px;
}

.btn{
flex:1;
padding:12px;
border-radius:12px;
text-align:center;
font-weight:600;
}

.btn-primary{
background:var(--primary);
color:#000;
}

.btn-dark{
background:var(--soft);
}

/* ================= GRID ================= */
.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
gap:10px;
margin-top:20px;
}

.card{
background:var(--card);
padding:14px;
border-radius:14px;
text-align:center;
border:1px solid rgba(255,255,255,0.05);
transition:.2s;
}

.card:hover{
transform:translateY(-3px);
}

/* ================= ARTICLE ================= */
.article{
background:var(--card);
padding:18px;
border-radius:var(--radius);
margin-top:20px;
border:1px solid rgba(255,255,255,0.05);
}

.article h1{
font-size:24px;
}

.article p{
color:var(--muted);
line-height:1.8;
}

/* ================= FOOTER ================= */
.footer{
margin-top:40px;
padding:30px 16px;
text-align:center;
color:var(--muted);
border-top:1px solid rgba(255,255,255,0.06);
}

/* ================= BOTTOM NAV (MODERN APP STYLE) ================= */
.bottom-nav{
position:fixed;
bottom:0;
left:0;
right:0;
display:flex;
justify-content:space-around;
background:rgba(11,15,25,.95);
backdrop-filter:blur(10px);
padding:10px 0;
border-top:1px solid rgba(255,255,255,0.05);
}

.bottom-nav a{
font-size:11px;
text-align:center;
color:var(--muted);
}

.bottom-nav a.active{
color:var(--primary);
}

</style>

</head>

<body>

<!-- HEADER -->
<div class="header">
<div class="logo">${SITE.name}</div>
<button class="menu-btn" onclick="document.querySelector('.sidebar').classList.add('active')">☰</button>
</div>

<!-- SIDEBAR -->
<div class="sidebar">
<div class="close" onclick="this.parentElement.classList.remove('active')">✕</div>

<a href="#">Beranda</a>
<a href="#">Games</a>
<a href="#">Promo</a>
<a href="#">Login</a>
</div>

<!-- HERO -->
<div class="container">
<div class="hero">

<img src="${ogImage}" alt="hero">

<div class="hero-content">
<h1>${escapeHTML(title)}</h1>
<p>${escapeHTML(description)}</p>

<div class="btn-group">
<a class="btn btn-primary" href="#">Daftar</a>
<a class="btn btn-dark" href="#">Masuk</a>
</div>

</div>

</div>

<!-- CONTENT -->
${content}

</div>

<!-- FOOTER -->
<div class="footer">
© ${new Date().getFullYear()} ${SITE.name}
</div>

<!-- BOTTOM NAV -->
<div class="bottom-nav">
<a class="active" href="#">Home</a>
<a href="#">Games</a>
<a href="#">Promo</a>
<a href="#">Login</a>
<a href="#">Chat</a>
</div>

</body>
</html>`, {
headers: {
"content-type": "text/html;charset=UTF-8",
"cache-control": "public,max-age=300"
}
});
}
