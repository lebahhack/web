import {
SITE,
url as buildUrl,
amphtml,
escapeHTML
} from "./config";

export function layout({
title=SITE.name,
description=SITE.description,
canonical="",
image="",
schema="",
robots="",
content=""
}){

const canonicalUrl=
canonical||SITE.domain;

const ampUrl=
amphtml(
canonicalUrl.replace(
SITE.domain,
""
)
);

const ogImage=
image||
buildUrl(SITE.defaultImage);

return new Response(`<!DOCTYPE html>
<html lang="id">
<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1"
>

<title>
${escapeHTML(title)}
</title>

<meta
name="description"
content="${escapeHTML(description)}"
>

<link
rel="canonical"
href="${canonicalUrl}"
>

<link
rel="amphtml"
href="${ampUrl}"
>

<meta
name="robots"
content="index,follow,max-image-preview:large"
>

<meta
name="theme-color"
content="#020617"
>

<meta
name="author"
content="${SITE.name}"
>

<meta
property="og:type"
content="article"
>

<meta
property="og:site_name"
content="${SITE.name}"
>

<meta
property="og:title"
content="${escapeHTML(title)}"
>

<meta
property="og:description"
content="${escapeHTML(description)}"
>

<meta
property="og:url"
content="${canonicalUrl}"
>

<meta
property="og:image"
content="${ogImage}"
>

<meta
name="twitter:card"
content="summary_large_image"
>

<meta
name="twitter:title"
content="${escapeHTML(title)}"
>

<meta
name="twitter:description"
content="${escapeHTML(description)}"
>

<meta
name="twitter:image"
content="${ogImage}"
>

<link
rel="sitemap"
type="application/xml"
href="${SITE.domain}/sitemap.xml"
>

<link
rel="alternate"
type="application/rss+xml"
title="${SITE.name}"
href="${SITE.domain}/rss.xml"
>

${robots||""}
${schema||""}

<style>

:root{
--bg:#020617;
--card:#0f172a;
--text:#e5e7eb;
--muted:#94a3b8;
--primary:#8b5cf6;
--border:#1e293b;
--shadow:0 10px 30px rgba(0,0,0,.35);
}

*{
box-sizing:border-box;
margin:0;
padding:0;
}

html{
scroll-behavior:smooth;
}

body{
font-family:
Inter,
Arial,
sans-serif;
background:
radial-gradient(
circle at top left,
rgba(99,102,241,.15),
transparent 30%
),
radial-gradient(
circle at bottom right,
rgba(139,92,246,.12),
transparent 30%
),
var(--bg);
color:var(--text);
line-height:1.8;
-webkit-font-smoothing:antialiased;
}

a{
text-decoration:none;
color:inherit;
}

img{
max-width:100%;
display:block;
height:auto;
}

.header{
position:sticky;
top:0;
z-index:999;
backdrop-filter:blur(16px);
background:rgba(2,6,23,.72);
border-bottom:1px solid rgba(255,255,255,.05);
}

.header-wrap{
max-width:1200px;
margin:auto;
padding:16px 20px;
display:flex;
align-items:center;
justify-content:space-between;
gap:20px;
}

.logo{
font-size:24px;
font-weight:800;
letter-spacing:-.5px;
color:#fff;
}

.logo span{
background:
linear-gradient(
90deg,
#8b5cf6,
#06b6d4
);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.nav{
display:flex;
gap:20px;
flex-wrap:wrap;
}

.nav a{
font-size:14px;
color:var(--muted);
transition:.25s ease;
}

.nav a:hover{
color:#fff;
transform:translateY(-1px);
}

.container{
max-width:980px;
margin:auto;
padding:26px 20px;
}

.hero{
position:relative;
overflow:hidden;
padding:70px 30px;
border-radius:28px;
margin-bottom:34px;
background:
linear-gradient(
135deg,
#4f46e5,
#7c3aed
);
box-shadow:
0 20px 60px rgba(99,102,241,.35);
}

.hero::before{
content:"";
position:absolute;
width:320px;
height:320px;
background:rgba(255,255,255,.08);
border-radius:50%;
top:-100px;
right:-80px;
filter:blur(10px);
}

.hero h1{
position:relative;
z-index:2;
font-size:48px;
line-height:1.1;
margin-bottom:14px;
color:#fff;
letter-spacing:-1px;
}

.hero p{
position:relative;
z-index:2;
font-size:18px;
max-width:720px;
color:#e0e7ff;
}

.seo-box{
padding:24px;
border-radius:24px;
background:
linear-gradient(
180deg,
rgba(255,255,255,.03),
rgba(255,255,255,.01)
);
border:1px solid rgba(255,255,255,.06);
backdrop-filter:blur(14px);
margin-bottom:30px;
box-shadow:var(--shadow);
}

.grid{
display:grid;
grid-template-columns:
repeat(
auto-fit,
minmax(280px,1fr)
);
gap:24px;
}

.card{
overflow:hidden;
border-radius:24px;
background:
linear-gradient(
180deg,
rgba(255,255,255,.03),
rgba(255,255,255,.01)
);
border:1px solid rgba(255,255,255,.05);
transition:
transform .28s ease,
border-color .28s ease,
box-shadow .28s ease;
box-shadow:var(--shadow);
}

.card:hover{
transform:translateY(-6px);
border-color:rgba(139,92,246,.45);
box-shadow:
0 20px 40px rgba(0,0,0,.35);
}

.card img{
width:100%;
aspect-ratio:1200/630;
object-fit:cover;
}

.card h3,
.card h4{
padding:18px;
font-size:20px;
line-height:1.4;
font-weight:700;
color:#fff;
}

.search{
width:100%;
padding:16px 18px;
border-radius:18px;
border:1px solid rgba(255,255,255,.08);
background:rgba(255,255,255,.03);
color:#fff;
font-size:16px;
margin-bottom:18px;
outline:none;
backdrop-filter:blur(10px);
transition:.25s ease;
}

.search:focus{
border-color:#8b5cf6;
box-shadow:
0 0 0 4px rgba(139,92,246,.15);
}

#results{
display:grid;
gap:12px;
margin-bottom:24px;
}

.search-item{
padding:16px;
border-radius:18px;
background:var(--card);
border:1px solid rgba(255,255,255,.05);
}

.post img{
border-radius:24px;
margin-bottom:26px;
box-shadow:var(--shadow);
}

.post h1{
font-size:42px;
line-height:1.2;
margin-bottom:20px;
letter-spacing:-1px;
}

.post-content{
font-size:18px;
color:#dbe4ee;
}

.post-content p{
margin:20px 0;
}

.post-content h2{
font-size:32px;
margin-top:50px;
margin-bottom:18px;
line-height:1.3;
}

.post-content h3{
font-size:24px;
margin-top:36px;
margin-bottom:12px;
}

.post-content ul{
padding-left:24px;
margin:20px 0;
}

.post-content li{
margin:10px 0;
}

.post-content a{
color:#8b5cf6;
text-decoration:underline;
}

.post-content blockquote{
padding:20px;
border-left:4px solid #8b5cf6;
background:rgba(255,255,255,.03);
border-radius:16px;
margin:24px 0;
}

.breadcrumb{
font-size:14px;
margin-bottom:22px;
color:var(--muted);
}

.pagination{
display:flex;
justify-content:center;
flex-wrap:wrap;
gap:10px;
margin:50px 0;
}

.pagination a{
padding:12px 16px;
border-radius:14px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.05);
transition:.2s ease;
}

.pagination a:hover{
transform:translateY(-2px);
}

.pagination a.active{
background:#8b5cf6;
color:#fff;
border-color:#8b5cf6;
}

.footer{
margin-top:70px;
padding:50px 20px;
border-top:1px solid rgba(255,255,255,.05);
background:rgba(255,255,255,.02);
}

.footer-wrap{
max-width:1100px;
margin:auto;
display:grid;
grid-template-columns:
2fr 1fr 1fr;
gap:40px;
}

.footer-brand h3{
font-size:24px;
margin-bottom:12px;
color:#fff;
}

.footer-brand p{
font-size:15px;
color:var(--muted);
max-width:420px;
}

.footer-menu h4{
font-size:16px;
margin-bottom:14px;
color:#fff;
}

.footer-menu{
display:flex;
flex-direction:column;
gap:12px;
}

.footer-menu a{
font-size:14px;
color:var(--muted);
transition:.2s ease;
}

.footer-menu a:hover{
color:#fff;
transform:translateX(3px);
}

.footer-bottom{
margin-top:40px;
padding-top:20px;
border-top:1px solid rgba(255,255,255,.05);
text-align:center;
font-size:14px;
color:var(--muted);
}

@media(max-width:768px){

.container{
padding:18px;
}

.hero{
padding:48px 24px;
border-radius:24px;
}

.hero h1{
font-size:34px;
}

.hero p{
font-size:16px;
}

.post h1{
font-size:32px;
}

.post-content{
font-size:17px;
}

.grid{
grid-template-columns:1fr;
}

.header-wrap{
flex-direction:column;
align-items:flex-start;
}

.nav{
gap:14px;
}

.footer-wrap{
grid-template-columns:1fr;
gap:30px;
}

}

</style>

</head>

<body>

<header class="header">

<div class="header-wrap">

<a href="/" class="logo">
⚡ <span>${SITE.name}</span>
</a>

<nav class="nav">
<a href="/">Home</a>
<a href="/amp">AMP</a>
<a href="/rss.xml">RSS</a>
<a href="/sitemap.xml">Sitemap</a>
</nav>

</div>

</header>

<main class="container">
${content}
</main>

<footer class="footer">

<div class="footer-wrap">

<div class="footer-brand">

<h3>
⚡ ${SITE.name}
</h3>

<p>
Platform informasi aplikasi penghasil cuan,
AI modern, teknologi digital,
tips internet, dan tren online terbaru
dengan tampilan cepat, ringan,
dan modern.
</p>

</div>

<div class="footer-menu">

<h4>
Menu
</h4>

<a href="/">
Home
</a>

<a href="/about">
Tentang Kami
</a>

<a href="/contact">
Contact
</a>

<a href="/privacy-policy">
Privacy Policy
</a>

</div>

<div class="footer-menu">

<h4>
Informasi
</h4>

<a href="/terms">
Terms
</a>

<a href="/disclaimer">
Disclaimer
</a>

<a href="/pedoman-media-siber">
Pedoman Media Siber
</a>

<a href="/rss.xml">
RSS Feed
</a>

</div>

</div>

<div class="footer-bottom">
© ${new Date().getFullYear()} ${SITE.name} • All Rights Reserved
</div>

</footer>

</body>
</html>`,{
headers:{
"content-type":
"text/html;charset=UTF-8",
"cache-control":
"public,max-age=300"
}
});

}
