import { renderSEO } from "./seo";
import {
SITE,
safeImage,
formatDate,
stripHtml
} from "./config";

export function renderTemplate({

title="",
description="",
slug="",
content="",
posts=[],
image="",
jsonld=null,
pagination=null,
search=""

}){

const isPost=content?.length>0;

const seo=renderSEO({
title,
description,
image,
url:slug,
type:isPost?"article":"website",
jsonld
});

const hero=`

<div class="hero">

<h2>AI MODERN INDONESIA</h2>

<h1>1000X</h1>

<p>
AI SEO • AI CONTENT • AI CHAT • AI GENERATOR
</p>

<div class="cta">

<a href="#"
class="btn">
MULAI AI
</a>

<a href="#"
class="btn2">
AI TOOLS
</a>

</div>

</div>

`;

const cards=posts.map(post=>`

<div class="card">

<img
src="${safeImage(post.image)}"
alt="${post.title}"
loading="lazy">

<a href="/${post.slug}">
${post.title}
</a>

<span>
${stripHtml(post.content||"")
.slice(0,70)}
</span>

</div>

`).join("");

const article=isPost?`

<article class="article">

<h1>
${title}
</h1>

<div class="meta">

<span>
${formatDate(new Date())}
</span>

</div>

<img
class="cover"
src="${safeImage(image)}"
alt="${title}">

<div class="post-content">

${content}

</div>

</article>

`:"";

const paginationHtml=pagination
?renderPagination(pagination)
:"";

const internalLinks=posts.length?`

<div class="section">

<h3>
🔥 RELATED POSTS
</h3>

<div class="grid">
${cards}
</div>

</div>

`:"";

return `

<!DOCTYPE html>

<html lang="${SITE.lang}">

<head>

${seo}

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
background:#0f0f0f;
color:#fff;
font-family:Arial,sans-serif;
line-height:1.6;
}

a{
text-decoration:none;
color:#fff;
}

.wrap{
max-width:1200px;
margin:auto;
padding:20px;
}

.desktop-header{
background:#111;
border-bottom:1px solid #222;
padding:15px 0;
}

.main-nav{
display:flex;
justify-content:space-between;
align-items:center;
gap:20px;
}

.logo{
font-size:28px;
font-weight:bold;
color:#ff0000;
}

.nav-menu{
display:flex;
gap:20px;
flex-wrap:wrap;
}

.nav-menu a{
font-size:14px;
padding:10px;
background:#1b1b1b;
border-radius:10px;
}

.hero{
padding:60px 20px;
text-align:center;
}

.hero h1{
font-size:80px;
color:#ff0000;
}

.hero h2{
font-size:26px;
margin-bottom:10px;
}

.hero p{
opacity:.8;
margin-top:10px;
}

.cta{
margin-top:30px;
display:flex;
justify-content:center;
gap:15px;
flex-wrap:wrap;
}

.btn,.btn2{
padding:14px 24px;
border-radius:10px;
font-weight:bold;
}

.btn{
background:#ff0000;
}

.btn2{
background:#222;
}

.section{
margin-top:40px;
}

.section h3{
margin-bottom:20px;
font-size:22px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
gap:20px;
}

.card{
background:#171717;
border-radius:14px;
overflow:hidden;
padding-bottom:15px;
transition:.2s;
}

.card:hover{
transform:translateY(-4px);
}

.card img{
width:100%;
height:160px;
object-fit:cover;
display:block;
}

.card a{
display:block;
padding:14px;
font-weight:bold;
font-size:16px;
}

.card span{
display:block;
padding:0 14px;
font-size:13px;
opacity:.7;
}

.article{
background:#171717;
padding:25px;
border-radius:16px;
margin-top:40px;
}

.article h1{
font-size:34px;
margin-bottom:10px;
}

.meta{
font-size:13px;
opacity:.6;
margin-bottom:20px;
}

.cover{
width:100%;
border-radius:14px;
margin-bottom:25px;
}

.post-content{
font-size:16px;
}

.post-content h2,
.post-content h3{
margin:20px 0 10px;
}

.post-content p{
margin-bottom:15px;
}

.post-content img{
max-width:100%;
border-radius:10px;
margin:20px 0;
}

.pagination{
display:flex;
justify-content:center;
gap:10px;
margin-top:40px;
flex-wrap:wrap;
}

.pagination a{
padding:10px 16px;
background:#1b1b1b;
border-radius:8px;
font-size:14px;
}

.pagination .active{
background:#ff0000;
}

.footer{
margin-top:60px;
padding:30px 0;
text-align:center;
font-size:14px;
opacity:.7;
}

.search{
margin:30px 0;
}

.search form{
display:flex;
gap:10px;
}

.search input{
flex:1;
padding:14px;
border:none;
border-radius:10px;
background:#1b1b1b;
color:#fff;
}

.search button{
padding:14px 20px;
border:none;
border-radius:10px;
background:#ff0000;
color:#fff;
font-weight:bold;
}

@media(max-width:768px){

.hero h1{
font-size:48px;
}

.main-nav{
flex-direction:column;
}

.nav-menu{
justify-content:center;
}

.article h1{
font-size:26px;
}

}

</style>

</head>

<body>

<div class="wrap">

<header class="desktop-header">

<div class="main-nav">

<a href="/"
class="logo">
${SITE.name}
</a>

<div class="nav-menu">

<a href="/">BERANDA</a>

<a href="/search?q=seo">
AI SEO
</a>

<a href="/search?q=chat">
AI CHAT
</a>

<a href="/search?q=content">
AI CONTENT
</a>

<a href="/rss.xml">
RSS
</a>

</div>

</div>

</header>

${!isPost?hero:""}

<div class="search">

<form action="/search">

<input
type="text"
name="q"
placeholder="Search..."
value="${search}">

<button type="submit">
Search
</button>

</form>

</div>

${article}

<div class="section">

<h3>

${isPost
?"🔥 RELATED ARTICLES"
:"🔥 POSTINGAN TERBARU"}

</h3>

<div class="grid">

${cards}

</div>

</div>

${internalLinks}

${paginationHtml}

<div class="footer">

© ${new Date().getFullYear()}
${SITE.name}

</div>

</div>

</body>

</html>

`;

}

function renderPagination({
page,
totalPages,
base
}){

if(totalPages<=1){
return "";
}

let html=`<div class="pagination">`;

for(let i=1;i<=totalPages;i++){

const sep=base.includes("?")
?"&"
:"?";

html+=`

<a
href="${base}${sep}page=${i}"
class="${
i===page
?"active"
:""
}">
${i}
</a>

`;

}

html+=`</div>`;

return html;

}
