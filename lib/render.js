import { SITE } from "./config";

export function layout({
title="Auto Blog",
description="Artikel terbaru",
canonical="",
amp="",
image="",
schema="",
content=""
}){

return new Response(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHTML(title)}</title>
<meta name="description" content="${escapeHTML(description)}">
<link rel="canonical" href="${canonical || SITE.domain}">
${amp ? `<link rel="amphtml" href="${amp}">` : ""}
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="article">
<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${canonical || SITE.domain}">
<meta property="og:image" content="${image || SITE.domain+"/og/default"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHTML(title)}">
<meta name="twitter:description" content="${escapeHTML(description)}">
<meta name="twitter:image" content="${image || SITE.domain+"/og/default"}">
<meta name="theme-color" content="#0f172a">
${schema || ""}

<style>
:root{
--bg:#09090b;
--card:#18181b;
--border:#27272a;
--text:#fafafa;
--muted:#a1a1aa;
--primary:#6366f1;
--primary2:#8b5cf6;
--radius:18px;
--shadow:0 10px 30px rgba(0,0,0,.35);
}

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
background:linear-gradient(180deg,#09090b,#111827);
color:var(--text);
font-family:Inter,system-ui,sans-serif;
line-height:1.7;
}

a{
color:inherit;
text-decoration:none;
}

img{
max-width:100%;
display:block;
height:auto;
}

.container{
width:100%;
max-width:1180px;
margin:auto;
padding:20px;
}

.header{
position:sticky;
top:0;
z-index:999;
backdrop-filter:blur(14px);
background:rgba(9,9,11,.82);
border-bottom:1px solid rgba(255,255,255,.06);
}

.nav{
display:flex;
align-items:center;
justify-content:space-between;
gap:20px;
padding:16px 20px;
max-width:1180px;
margin:auto;
}

.logo{
font-size:24px;
font-weight:900;
background:linear-gradient(90deg,#fff,#818cf8);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.menu{
display:flex;
gap:16px;
flex-wrap:wrap;
}

.menu a{
padding:10px 14px;
border-radius:12px;
font-size:14px;
color:var(--muted);
transition:.2s;
}

.menu a:hover{
background:rgba(255,255,255,.06);
color:#fff;
}

.hero{
padding:70px 30px;
border-radius:30px;
background:
radial-gradient(circle at top left,rgba(99,102,241,.35),transparent 40%),
radial-gradient(circle at bottom right,rgba(139,92,246,.25),transparent 40%),
#111827;
border:1px solid rgba(255,255,255,.08);
box-shadow:var(--shadow);
margin-bottom:30px;
text-align:center;
overflow:hidden;
}

.hero h1{
font-size:54px;
line-height:1.1;
margin-bottom:14px;
font-weight:900;
}

.hero p{
max-width:760px;
margin:auto;
font-size:18px;
color:var(--muted);
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
gap:22px;
}

.card{
background:rgba(24,24,27,.95);
border:1px solid rgba(255,255,255,.06);
border-radius:var(--radius);
overflow:hidden;
transition:.25s;
box-shadow:var(--shadow);
}

.card:hover{
transform:translateY(-5px);
border-color:rgba(99,102,241,.5);
}

.card img{
aspect-ratio:16/9;
object-fit:cover;
}

.card h2,
.card h3{
padding:18px;
font-size:18px;
line-height:1.4;
}

.card p{
padding:0 18px 18px;
font-size:14px;
color:var(--muted);
}

.post{
max-width:860px;
margin:auto;
}

.post img{
border-radius:24px;
margin-bottom:24px;
aspect-ratio:16/9;
object-fit:cover;
}

.post h1{
font-size:46px;
line-height:1.15;
margin-bottom:20px;
}

.post-content{
font-size:18px;
color:#e4e4e7;
}

.post-content h2{
font-size:30px;
margin:40px 0 16px;
}

.post-content h3{
font-size:24px;
margin:30px 0 14px;
}

.post-content p{
margin-bottom:18px;
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

.search{
width:100%;
padding:16px 18px;
border-radius:18px;
border:1px solid rgba(255,255,255,.08);
background:#111827;
color:#fff;
font-size:16px;
outline:none;
margin-bottom:24px;
}

.search:focus{
border-color:#6366f1;
}

.pagination{
display:flex;
justify-content:center;
gap:10px;
flex-wrap:wrap;
margin-top:40px;
}

.pagination a{
padding:12px 16px;
border-radius:12px;
background:#18181b;
border:1px solid rgba(255,255,255,.06);
font-size:14px;
}

.pagination a.active{
background:linear-gradient(90deg,#6366f1,#8b5cf6);
border-color:transparent;
}

.footer{
margin-top:60px;
padding:40px 20px;
text-align:center;
color:var(--muted);
font-size:14px;
border-top:1px solid rgba(255,255,255,.06);
}

@media(max-width:768px){

.hero{
padding:50px 20px;
border-radius:22px;
}

.hero h1{
font-size:36px;
}

.hero p{
font-size:16px;
}

.post h1{
font-size:32px;
}

.post-content{
font-size:16px;
}

.nav{
padding:14px 16px;
}

.menu{
display:none;
}

.container{
padding:16px;
}

}
</style>
</head>

<body>

<header class="header">
<div class="nav">
<a href="/" class="logo">${SITE.name}</a>

<div class="menu">
<a href="/">Home</a>
<a href="/kategori/seo">SEO</a>
<a href="/kategori/blog">Blog</a>
<a href="/kategori/tools">Tools</a>
</div>
</div>
</header>

<main class="container">
${content}
</main>

<footer class="footer">
© ${new Date().getFullYear()} ${SITE.name} • Modern SEO Platform
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
