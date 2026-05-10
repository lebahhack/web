import { SITE } from "./config";

export function renderAmp({
title=SITE.name + " AMP",
description=SITE.description,
canonical="",
content="",
image=""
}){

const url=canonical||SITE.domain;
const og=image||`${SITE.domain}/og/default`;

return new Response(`<!doctype html>
<html amp lang="id">
<head>
<meta charset="utf-8">
<title>${escapeHTML(title)}</title>
<link rel="canonical" href="${url}">
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<meta name="description" content="${escapeHTML(description)}">
<meta name="robots" content="index,follow,max-image-preview:large">

<meta property="og:type" content="article">
<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHTML(title)}">
<meta name="twitter:description" content="${escapeHTML(description)}">
<meta name="twitter:image" content="${og}">

<meta name="theme-color" content="#0f172a">

<script async src="https://cdn.ampproject.org/v0.js"></script>

<style amp-boilerplate>
body{
-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
animation:-amp-start 8s steps(1,end) 0s 1 normal both
}
@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
</style>

<noscript>
<style amp-boilerplate>
body{
-webkit-animation:none;
-moz-animation:none;
-ms-animation:none;
animation:none
}
</style>
</noscript>

<style amp-custom>

:root{
--bg:#020617;
--card:#0f172a;
--card2:#111827;
--text:#f8fafc;
--muted:#94a3b8;
--primary:#6366f1;
--border:#1e293b;
--gradient:linear-gradient(135deg,#4f46e5,#7c3aed);
}

*{
box-sizing:border-box;
}

body{
margin:0;
background:var(--bg);
font-family:Arial,sans-serif;
color:var(--text);
line-height:1.7;
}

a{
text-decoration:none;
color:inherit;
}

img{
max-width:100%;
}

.header{
position:sticky;
top:0;
z-index:99;
background:rgba(2,6,23,.95);
backdrop-filter:blur(10px);
border-bottom:1px solid var(--border);
}

.header-wrap{
max-width:1100px;
margin:auto;
padding:14px 18px;
display:flex;
align-items:center;
justify-content:space-between;
}

.logo{
font-size:22px;
font-weight:800;
color:#fff;
}

.logo span{
color:#818cf8;
}

.nav{
display:flex;
gap:18px;
font-size:14px;
color:var(--muted);
}

.nav a:hover{
color:#fff;
}

.container{
max-width:1100px;
margin:auto;
padding:20px;
}

.hero{
padding:70px 24px;
border-radius:24px;
background:var(--gradient);
margin-bottom:28px;
text-align:center;
position:relative;
overflow:hidden;
}

.hero:before{
content:"";
position:absolute;
inset:0;
background:radial-gradient(circle at top right,rgba(255,255,255,.18),transparent 40%);
}

.hero h1{
position:relative;
margin:0 0 12px;
font-size:42px;
line-height:1.2;
font-weight:800;
}

.hero p{
position:relative;
margin:0 auto;
max-width:700px;
font-size:16px;
opacity:.92;
}

.hero-btn{
position:relative;
margin-top:22px;
display:inline-block;
padding:14px 24px;
border-radius:14px;
background:#fff;
color:#111827;
font-weight:700;
}

.section-title{
margin:0 0 18px;
font-size:24px;
font-weight:800;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:20px;
}

.card{
background:var(--card);
border:1px solid var(--border);
border-radius:20px;
overflow:hidden;
transition:.2s;
}

.card amp-img{
background:#111827;
}

.card-body{
padding:16px;
}

.card h2,
.card h3{
margin:0 0 10px;
font-size:18px;
line-height:1.4;
}

.card p{
margin:0;
font-size:14px;
color:var(--muted);
}

.badge{
display:inline-block;
padding:6px 10px;
border-radius:999px;
background:#312e81;
font-size:12px;
margin-bottom:10px;
color:#c7d2fe;
}

.post{
max-width:850px;
margin:auto;
}

.post amp-img{
border-radius:20px;
overflow:hidden;
margin-bottom:20px;
}

.post h1{
font-size:38px;
line-height:1.3;
margin:0 0 18px;
}

.post-content{
font-size:17px;
color:#e2e8f0;
}

.post-content h2,
.post-content h3{
margin-top:32px;
font-size:26px;
}

.post-content p{
margin:0 0 18px;
}

.post-content a{
color:#818cf8;
text-decoration:underline;
}

.pagination{
display:flex;
justify-content:center;
gap:10px;
margin:40px 0 10px;
flex-wrap:wrap;
}

.pagination a{
padding:10px 15px;
border-radius:12px;
background:var(--card);
border:1px solid var(--border);
font-size:14px;
}

.pagination .active{
background:var(--primary);
color:#fff;
}

.footer{
margin-top:60px;
padding:40px 20px;
text-align:center;
border-top:1px solid var(--border);
color:var(--muted);
font-size:14px;
}

@media(max-width:768px){

.container{
padding:16px;
}

.hero{
padding:50px 20px;
border-radius:18px;
}

.hero h1{
font-size:32px;
}

.post h1{
font-size:30px;
}

.nav{
display:none;
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
© ${new Date().getFullYear()} ${SITE.name} — AMP Modern UI
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
