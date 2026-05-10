import {
SITE,
url as buildUrl,
escapeHTML
} from "./config";

export function layoutAmp({
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

const ogImage=
image||
buildUrl(SITE.defaultImage);

return new Response(`<!DOCTYPE html>
<html amp lang="id">
<head>

<meta charset="utf-8">

<title>${escapeHTML(title)}</title>

<meta
name="viewport"
content="width=device-width,minimum-scale=1,initial-scale=1"
>

<meta
name="description"
content="${escapeHTML(description)}"
>

<link
rel="canonical"
href="${canonicalUrl}"
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

<script async
src="https://cdn.ampproject.org/v0.js">
</script>

<style amp-boilerplate>
body{
-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;
animation:-amp-start 8s steps(1,end) 0s 1 normal both;
}
@-webkit-keyframes -amp-start{
from{visibility:hidden}
to{visibility:visible}
}
@-moz-keyframes -amp-start{
from{visibility:hidden}
to{visibility:visible}
}
@-ms-keyframes -amp-start{
from{visibility:hidden}
to{visibility:visible}
}
@-o-keyframes -amp-start{
from{visibility:hidden}
to{visibility:visible}
}
@keyframes -amp-start{
from{visibility:hidden}
to{visibility:visible}
}
</style>

<noscript>
<style amp-boilerplate>
body{
-webkit-animation:none;
-moz-animation:none;
-ms-animation:none;
animation:none;
}
</style>
</noscript>

${robots||""}
${schema||""}

<style amp-custom>

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

.wrap{
max-width:860px;
margin:auto;
padding:16px;
}

.header{
padding:18px 0;
border-bottom:1px solid var(--border);
margin-bottom:20px;
}

.logo{
font-size:22px;
font-weight:700;
color:#fff;
}

.hero{
padding:50px 20px;
border-radius:18px;
background:linear-gradient(135deg,#4f46e5,#6366f1);
text-align:center;
margin-bottom:28px;
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

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
gap:18px;
}

.card{
background:var(--card);
border:1px solid var(--border);
border-radius:16px;
overflow:hidden;
}

.card h3,
.card h4{
padding:14px;
margin:0;
font-size:18px;
color:#fff;
}

.post amp-img{
border-radius:16px;
overflow:hidden;
margin-bottom:18px;
}

.post h1{
font-size:32px;
line-height:1.3;
margin:18px 0;
}

.post-content{
font-size:17px;
word-break:break-word;
}

.post-content h2,
.post-content h3{
margin-top:28px;
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
background:var(--card);
border:1px solid var(--border);
}

.pagination a.active{
background:var(--primary);
color:#fff;
}

.footer{
margin-top:50px;
padding:30px 0;
border-top:1px solid var(--border);
text-align:center;
font-size:14px;
color:var(--muted);
}

@media(max-width:768px){

.hero{
padding:40px 18px;
}

.hero h1{
font-size:28px;
}

.post h1{
font-size:26px;
}

.grid{
grid-template-columns:1fr;
}

}

</style>

</head>

<body>

<div class="wrap">

<header class="header">
<div class="logo">
⚡ ${SITE.name} AMP
</div>
</header>

${content}

<footer class="footer">
© ${new Date().getFullYear()} ${SITE.name}
</footer>

</div>

</body>
</html>`,{
headers:{
"content-type":"text/html;charset=UTF-8",
"cache-control":"public,max-age=300"
}
});

}
