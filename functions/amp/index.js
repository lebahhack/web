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
<div class="card">

<a href="/${sanitizeSlug(p.slug)}">

${cardImage(
ogImage(p.slug),
p.title
)}

<h3>
${p.title}
</h3>

</a>

</div>
`).join("");

const html=`

<div class="hero">

<h1>
${SITE.name}
</h1>

<p>
Artikel terbaru SEO dan teknologi
</p>

</div>

<div class="grid">
${grid}
</div>

${pagination(page,totalPage)}

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
