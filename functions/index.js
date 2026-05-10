import { layout } from "../lib/render";
import { getPosts } from "../lib/api";
import { SITE,canonical,sanitizeSlug,cardImage } from "../lib/config";

export async function onRequest(context){
try{

const url=new URL(context.request.url);
const page=parseInt(url.searchParams.get("page"))||1;

const robots=page>1
?'<meta name="robots" content="noindex,follow">'
:"";

const posts=await getPosts();

const perPage=12;
const totalPage=Math.ceil(posts.length/perPage);

const start=(page-1)*perPage;
const currentPosts=posts.slice(start,start+perPage);

const grid=currentPosts.map(p=>`
<article class="card">
<a href="/${sanitizeSlug(p.slug)}">
${cardImage(`/og/${sanitizeSlug(p.slug)}`,p.title)}
<h3>${p.title}</h3>
</a>
</article>
`).join("");

return layout({
title:SITE.name,
description:SITE.description,
canonical:canonical(page>1?"/?page="+page:"/"),

schema:`
${robots}

<script type="application/ld+json">
{
"@context":"https://schema.org",
"@type":"WebSite",
"name":"${SITE.name}",
"url":"${SITE.domain}",
"potentialAction":{
"@type":"SearchAction",
"target":"${SITE.domain}/?q={search_term_string}",
"query-input":"required name=search_term_string"
}
}
</script>
`,

content:`

<section class="hero">
<h1>${SITE.name}</h1>
<p>${SITE.description}</p>
</section>

<section class="seo-box">
<h2>Artikel SEO & Teknologi</h2>
<p>
Tutorial SEO, AI content, blogging, digital marketing,
dan teknologi terbaru dengan loading cepat dan SEO modern.
</p>
</section>

<input
class="search"
type="search"
placeholder="Cari artikel..."
autocomplete="off"
>

<div id="results"></div>

<h2 class="section-title">
Artikel Terbaru
</h2>

<div class="grid">
${grid}
</div>

${pagination(page,totalPage)}

${searchScript()}
`
});

}catch(e){

return new Response(
"Error: "+e.message,
{status:500}
);

}
}

function pagination(current,total){

if(total<=1) return "";

let html=`<nav class="pagination">`;

const group=Math.floor((current-1)/5);

const start=group*5+1;

const end=Math.min(start+4,total);

if(start>1){
html+=`
<a href="/?page=${start-1}">
«
</a>
`;
}

for(let i=start;i<=end;i++){

html+=`
<a
href="/?page=${i}"
class="${i===current?"active":""}"
>
${i}
</a>
`;

}

if(end<total){
html+=`
<a href="/?page=${end+1}">
»
</a>
`;
}

html+=`</nav>`;

return html;
}

function searchScript(){

return `
<script>

const input=document.querySelector(".search");

const results=document.getElementById("results");

let timer;

input?.addEventListener("input",e=>{

clearTimeout(timer);

timer=setTimeout(async()=>{

const q=e.target.value.trim();

if(q.length<2){
results.innerHTML="";
return;
}

try{

const res=await fetch(
"/api/search?q="+encodeURIComponent(q)
);

const data=await res.json();

results.innerHTML=data.map(d=>\`
<a
class="search-item"
href="/\${d.slug}"
>
\${d.title}
</a>
\`).join("");

}catch{
results.innerHTML="";
}

},300);

});

</script>
`;
}
