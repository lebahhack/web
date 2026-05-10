import { renderAmp } from "../../lib/renderAmp";
import { getPosts } from "../../lib/api";
import {
SITE,
canonical,
amphtml,
sanitizeSlug,
ogImage,
cardImage
} from "../../lib/config";

export async function onRequest(context){

try{

const url=new URL(context.request.url);

const page=parseInt(
url.searchParams.get("page")
)||1;

const posts=await getPosts();

const perPage=12;

const totalPage=Math.ceil(
posts.length/perPage
);

const start=(page-1)*perPage;

const currentPosts=posts.slice(
start,
start+perPage
);

const grid=currentPosts.map(p=>`
<article class="card">

<a href="/${sanitizeSlug(p.slug)}">

<div class="thumb">
${cardImage(
ogImage(p.slug),
p.title
)}
</div>

<div class="body">

<span class="badge">
ARTIKEL
</span>

<h3>
${p.title}
</h3>

</div>

</a>

</article>
`).join("");

const html=`

<section class="hero">

<div class="hero-box">

<span class="hero-badge">
⚡ SEO MODERN
</span>

<h1>
${SITE.name}
</h1>

<p>
Tutorial SEO, AI, blogging,
dan teknologi modern Indonesia
</p>

<div class="hero-btns">

<a
href="#latest"
class="btn">
Artikel
</a>

<a
href="/rss.xml"
class="btn btn2">
RSS
</a>

</div>

</div>

</section>

<section
id="latest"
class="section">

<div class="section-title">

<h2>
Artikel Terbaru
</h2>

<p>
Update konten terbaru setiap hari
</p>

</div>

<div class="grid">
${grid}
</div>

${pagination(page,totalPage)}

</section>

<style amp-custom>

body{
margin:0;
background:#050816;
font-family:Arial,sans-serif;
color:#fff;
}

a{
text-decoration:none;
color:#fff;
}

.hero{
padding:28px 16px;
}

.hero-box{
background:
linear-gradient(
135deg,
#4f46e5,
#7c3aed
);
padding:38px 22px;
border-radius:22px;
text-align:center;
box-shadow:
0 10px 40px
rgba(124,58,237,.35);
}

.hero-badge{
display:inline-block;
padding:8px 14px;
border-radius:999px;
background:
rgba(255,255,255,.14);
font-size:12px;
font-weight:700;
margin-bottom:16px;
}

.hero h1{
margin:0;
font-size:34px;
line-height:1.1;
font-weight:900;
}

.hero p{
margin:16px 0 0;
font-size:15px;
line-height:1.7;
color:#e5e7eb;
}

.hero-btns{
display:flex;
justify-content:center;
gap:10px;
margin-top:24px;
flex-wrap:wrap;
}

.btn{
padding:12px 18px;
border-radius:12px;
background:#fff;
color:#111827;
font-size:14px;
font-weight:700;
}

.btn2{
background:#111827;
color:#fff;
border:1px solid
rgba(255,255,255,.1);
}

.section{
padding:0 16px 40px;
}

.section-title{
margin-bottom:20px;
}

.section-title h2{
margin:0;
font-size:24px;
}

.section-title p{
margin:8px 0 0;
font-size:14px;
color:#94a3b8;
}

.grid{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(240px,1fr));
gap:18px;
}

.card{
background:#0f172a;
border:1px solid #1e293b;
border-radius:20px;
overflow:hidden;
transition:.2s;
}

.thumb img{
width:100%;
aspect-ratio:16/9;
object-fit:cover;
}

.body{
padding:16px;
}

.badge{
display:inline-block;
padding:6px 10px;
border-radius:999px;
background:#4f46e5;
font-size:11px;
font-weight:700;
margin-bottom:12px;
}

.card h3{
margin:0;
font-size:18px;
line-height:1.5;
color:#f8fafc;
}

.pagination{
display:flex;
justify-content:center;
gap:10px;
margin-top:34px;
flex-wrap:wrap;
}

.pagination a{
padding:10px 14px;
border-radius:12px;
background:#111827;
border:1px solid #1e293b;
font-size:14px;
}

.pagination a.active{
background:#4f46e5;
border-color:#4f46e5;
}

@media(max-width:768px){

.hero{
padding:18px 12px;
}

.hero-box{
padding:30px 18px;
border-radius:18px;
}

.hero h1{
font-size:28px;
}

.grid{
grid-template-columns:1fr;
}

.section{
padding:0 12px 30px;
}

}

</style>

`;

return renderAmp({
title:SITE.name,
description:SITE.description,
canonical:canonical("/"),
amp:amphtml("/"),
content:html,
schema:`
<script type="application/ld+json">
{
"@context":"https://schema.org",
"@type":"WebSite",
"name":"${SITE.name}",
"url":"${SITE.domain}"
}
</script>
`
});

}catch(e){

return new Response(
"AMP Error: "+e.message,
{status:500}
);

}

}

function pagination(current,total){

if(total<=1) return "";

let html=`<div class="pagination">`;

const group=Math.floor(
(current-1)/5
);

const start=group*5+1;

const end=Math.min(
start+4,
total
);

if(start>1){

html+=`
<a href="/amp?page=${start-1}">
«
</a>
`;

}

for(let i=start;i<=end;i++){

html+=`
<a
href="/amp?page=${i}"
class="${
i===current?"active":""
}">
${i}
</a>
`;

}

if(end<total){

html+=`
<a href="/amp?page=${end+1}">
»
</a>
`;

}

html+=`</div>`;

return html;

}
