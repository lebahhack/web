import { SITE } from "./config";

export function render({
title="Auto Blog",
description="Artikel terbaru",
canonical="",
amp="",
image="",
schema="",
content=""
}){

const url=canonical||SITE.domain;
const og=image||`${SITE.domain}/og/default`;

return new Response(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHTML(title)}</title>
<meta name="description" content="${escapeHTML(description)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${url}">
${amp?`<link rel="amphtml" href="${amp}">`:""}

<meta property="og:type" content="article">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHTML(title)}">
<meta name="twitter:description" content="${escapeHTML(description)}">
<meta name="twitter:image" content="${og}">

<link rel="icon" href="/favicon.ico">
<link rel="sitemap" type="application/xml" href="${SITE.domain}/sitemap.xml">
<link rel="alternate" type="application/rss+xml" title="${SITE.name}" href="${SITE.domain}/rss.xml">

${schema||""}

<style>
:root{
--bg:#0b0f19;
--card:#121826;
--card2:#182235;
--text:#f8fafc;
--muted:#94a3b8;
--line:#263043;
--primary:#6366f1;
--primary2:#8b5cf6;
--radius:18px;
--shadow:0 10px 35px rgba(0,0,0,.35);
}

*{margin:0;padding:0;box-sizing:border-box}

body{
background:linear-gradient(180deg,#090d16,#101827);
color:var(--text);
font-family:Arial,sans-serif;
line-height:1.7;
overflow-x:hidden;
}

a{
color:#fff;
text-decoration:none;
}

img{
max-width:100%;
height:auto;
display:block;
}

.container{
max-width:1180px;
margin:auto;
padding:0 18px;
}

.header{
position:sticky;
top:0;
z-index:999;
backdrop-filter:blur(12px);
background:rgba(10,15,25,.82);
border-bottom:1px solid rgba(255,255,255,.06);
}

.nav{
height:74px;
display:flex;
align-items:center;
justify-content:space-between;
gap:20px;
}

.logo{
font-size:28px;
font-weight:900;
background:linear-gradient(90deg,#fff,#8b5cf6);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.menu{
display:flex;
align-items:center;
gap:22px;
flex-wrap:wrap;
}

.menu a{
font-size:14px;
color:#cbd5e1;
transition:.2s;
}

.menu a:hover{
color:#fff;
}

.hero{
padding:90px 24px;
margin:30px 0;
border-radius:28px;
background:
radial-gradient(circle at top right,rgba(139,92,246,.4),transparent 30%),
linear-gradient(135deg,#4f46e5,#7c3aed);
box-shadow:var(--shadow);
position:relative;
overflow:hidden;
}

.hero:before{
content:"";
position:absolute;
inset:0;
background:
linear-gradient(rgba(255,255,255,.05),transparent);
pointer-events:none;
}

.hero h1{
font-size:58px;
line-height:1.1;
margin-bottom:18px;
font-weight:900;
max-width:760px;
}

.hero p{
font-size:18px;
max-width:700px;
color:#e2e8f0;
}

.hero-buttons{
display:flex;
gap:14px;
margin-top:28px;
flex-wrap:wrap;
}

.btn{
padding:14px 24px;
border-radius:14px;
background:#fff;
color:#111827;
font-weight:700;
transition:.2s;
}

.btn:hover{
transform:translateY(-2px);
}

.btn-outline{
background:rgba(255,255,255,.08);
border:1px solid rgba(255,255,255,.2);
color:#fff;
}

.search-wrap{
margin:34px 0;
}

.search{
width:100%;
padding:18px 20px;
border:none;
outline:none;
border-radius:18px;
background:var(--card);
color:#fff;
font-size:16px;
border:1px solid var(--line);
}

.search-results{
display:grid;
gap:14px;
margin-top:16px;
}

.search-item{
background:var(--card);
border:1px solid var(--line);
padding:18px;
border-radius:16px;
transition:.2s;
}

.search-item:hover{
background:var(--card2);
transform:translateY(-2px);
}

.section-title{
font-size:28px;
font-weight:800;
margin:36px 0 20px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
gap:22px;
}

.card{
background:linear-gradient(180deg,#131c2d,#101827);
border:1px solid var(--line);
border-radius:22px;
overflow:hidden;
transition:.25s;
box-shadow:0 4px 20px rgba(0,0,0,.18);
}

.card:hover{
transform:translateY(-6px);
border-color:#4f46e5;
}

.card img{
width:100%;
aspect-ratio:16/9;
object-fit:cover;
}

.card-body{
padding:18px;
}

.card h2,
.card h3{
font-size:21px;
line-height:1.4;
margin-bottom:10px;
}

.card p{
font-size:14px;
color:var(--muted);
}

.badge{
display:inline-flex;
padding:7px 12px;
border-radius:999px;
background:rgba(99,102,241,.14);
color:#c7d2fe;
font-size:12px;
margin-bottom:12px;
}

.post{
max-width:860px;
margin:auto;
}

.post-cover{
border-radius:26px;
overflow:hidden;
margin-bottom:24px;
border:1px solid var(--line);
}

.post h1{
font-size:48px;
line-height:1.2;
margin-bottom:18px;
}

.meta{
display:flex;
gap:14px;
flex-wrap:wrap;
font-size:14px;
color:var(--muted);
margin-bottom:28px;
}

.post-content{
font-size:18px;
color:#e5e7eb;
}

.post-content h2,
.post-content h3{
margin:36px 0 18px;
line-height:1.4;
}

.post-content p{
margin-bottom:20px;
}

.post-content a{
color:#a5b4fc;
text-decoration:underline;
}

.post-content ul,
.post-content ol{
padding-left:22px;
margin-bottom:20px;
}

.post-content li{
margin-bottom:10px;
}

.related{
margin-top:60px;
}

.pagination{
display:flex;
justify-content:center;
gap:10px;
margin:50px 0;
flex-wrap:wrap;
}

.pagination a{
padding:12px 16px;
border-radius:12px;
background:var(--card);
border:1px solid var(--line);
font-size:14px;
}

.pagination a.active{
background:linear-gradient(135deg,#4f46e5,#7c3aed);
border-color:transparent;
}

.footer{
margin-top:70px;
padding:50px 20px;
border-top:1px solid rgba(255,255,255,.06);
text-align:center;
color:#94a3b8;
font-size:14px;
}

.footer-links{
display:flex;
justify-content:center;
gap:18px;
margin-top:14px;
flex-wrap:wrap;
}

@media(max-width:768px){

.nav{
height:auto;
padding:16px 0;
flex-direction:column;
align-items:flex-start;
}

.logo{
font-size:24px;
}

.menu{
gap:14px;
}

.hero{
padding:60px 22px;
border-radius:22px;
}

.hero h1{
font-size:38px;
}

.hero p{
font-size:16px;
}

.section-title{
font-size:24px;
}

.post h1{
font-size:34px;
}

.post-content{
font-size:17px;
}

.grid{
grid-template-columns:1fr;
}

}

</style>
</head>

<body>

<header class="header">
<div class="container nav">
<a href="/" class="logo">${SITE.name}</a>

<nav class="menu">
<a href="/">Home</a>
<a href="/kategori/seo">SEO</a>
<a href="/kategori/blog">Blog</a>
<a href="/kategori/ai">AI</a>
<a href="/rss.xml">RSS</a>
</nav>
</div>
</header>

<main class="container">
${content}
</main>

<footer class="footer">
<div>© ${new Date().getFullYear()} ${SITE.name} — Modern SEO Platform</div>

<div class="footer-links">
<a href="/">Home</a>
<a href="/sitemap.xml">Sitemap</a>
<a href="/rss.xml">RSS</a>
</div>
</footer>

</body>
</html>`,{
headers:{
"content-type":"text/html;charset=UTF-8",
"cache-control":"public,max-age=300"
}
});

}

function escapeHTML(str=""){
return String(str).replace(/[&<>"]/g,c=>({
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;"
}[c]));
}
