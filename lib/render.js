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
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>${escapeHTML(title)}</title>

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
content="#0f172a"
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
--bg:#0f172a;
--card:#111827;
--text:#e5e7eb;
--muted:#94a3b8;
--primary:#6366f1;
--border:#1e293b;
}

*{
box-sizing:border-box;
}

body{
margin:0;
font-family:Arial,sans-serif;
background:var(--bg);
color:var(--text);
line-height:1.7;
}

a{
color:var(--primary);
text-decoration:none;
}

img{
max-width:100%;
height:auto;
display:block;
}

.header{
position:sticky;
top:0;
z-index:99;
padding:16px 20px;
background:#0f172a;
border-bottom:1px solid var(--border);
}

.logo{
font-size:22px;
font-weight:700;
color:#fff;
}

.container{
max-width:860px;
margin:auto;
padding:20px;
}

.hero{
padding:60px 20px;
border-radius:18px;
background:linear-gradient(135deg,#4f46e5,#6366f1);
margin-bottom:30px;
text-align:center;
}

.hero h1{
margin:0 0 10px;
font-size:36px;
color:#fff;
}

.hero p{
margin:0;
color:#e0e7ff;
}

.seo-box{
margin-bottom:28px;
padding:20px;
border-radius:16px;
background:var(--card);
border:1px solid var(--border);
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
gap:20px;
}

.card{
background:var(--card);
border:1px solid var(--border);
border-radius:16px;
overflow:hidden;
transition:.2s;
}

.card:hover{
transform:translateY(-4px);
}

.card img{
width:100%;
aspect-ratio:400/210;
object-fit:cover;
}

.card h3,
.card h4{
padding:14px;
margin:0;
font-size:18px;
color:#fff;
}

.search{
width:100%;
padding:14px;
border-radius:14px;
border:1px solid var(--border);
background:#111827;
color:#fff;
margin-bottom:16px;
outline:none;
}

#results{
display:grid;
gap:10px;
margin-bottom:20px;
}

.search-item{
padding:14px;
border-radius:12px;
background:var(--card);
border:1px solid var(--border);
}

.post img{
border-radius:16px;
aspect-ratio:1200/630;
object-fit:cover;
margin-bottom:20px;
}

.post h1{
font-size:34px;
line-height:1.3;
margin:18px 0;
}

.post-content{
font-size:17px;
word-break:break-word;
}

.post-content h2,
.post-content h3{
margin-top:30px;
}

.post-content a{
text-decoration:underline;
}

.breadcrumb{
font-size:14px;
margin-bottom:18px;
color:var(--muted);
}

.pagination{
display:flex;
justify-content:center;
gap:8px;
flex-wrap:wrap;
margin:40px 0;
}

.pagination a{
padding:10px 14px;
border-radius:10px;
border:1px solid var(--border);
background:var(--card);
}

.pagination a.active{
background:var(--primary);
color:#fff;
}

.footer{
margin-top:50px;
padding:30px 20px;
border-top:1px solid var(--border);
text-align:center;
font-size:14px;
color:var(--muted);
}

@media(max-width:768px){

.container{
padding:16px;
}

.hero{
padding:40px 20px;
}

.hero h1{
font-size:28px;
}

.post h1{
font-size:28px;
}

.grid{
grid-template-columns:1fr;
}

}

</style>

</head>

<body>

<header class="header">
<div class="logo">
⚡ ${SITE.name}
</div>

<nav class="nav">
<a href="/">Home</a>
<a href="/amp">AMP</a>
<a href="/rss.xml">RSS</a>
<a href="/sitemap.xml">Sitemap</a>
</nav>
</header>

<main class="container">
${content}
</main>

<footer class="footer">
© ${new Date().getFullYear()} ${SITE.name}
</footer>

</body>
</html>`,{
headers:{
"content-type":"text/html;charset=UTF-8",
"cache-control":"public,max-age=300"
}
});

}
