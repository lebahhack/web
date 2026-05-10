import { renderAmp } from "../../../lib/renderAmp";
import { getPosts } from "../../../lib/api";
import {
SITE,
canonical,
sanitizeSlug,
ogImage
} from "../../../lib/config";
import { withCache } from "../../../lib/cache";

export async function onRequest(context){

return withCache(
context,
300,
async()=>{

try{

const reqUrl=
new URL(
context.request.url
);

const page=
parseInt(
reqUrl.searchParams.get("page")
)||1;

const posts=
await getPosts();

const perPage=12;

const totalPage=
Math.ceil(
posts.length/perPage
);

const start=
(page-1)*perPage;

const currentPosts=
posts.slice(
start,
start+perPage
);

const grid=
currentPosts.map(p=>`
<div class="card">
<a href="/amp/${sanitizeSlug(p.slug)}">

<amp-img
src="${ogImage(p.slug)}"
width="400"
height="210"
layout="responsive"
alt="${p.title}">
</amp-img>

<h3>
${p.title}
</h3>

</a>
</div>
`).join("");

return renderAmp({

title:SITE.name,

description:SITE.description,

canonical:canonical(
page>1
?"/?page="+page
:"/"
),

content:`

<section class="hero">

<h1>
${SITE.name}
</h1>

<p>
${SITE.description}
</p>

</section>

<h2>
Artikel Terbaru
</h2>

<div class="grid">
${grid}
</div>

${pagination(
page,
totalPage
)}

`

});

}catch(e){

return new Response(
"AMP Error: "+e.message,
{
status:500
}
);

}

}
);

}

function pagination(
current,
total
){

if(total<=1){
return "";
}

let html=
`<div class="pagination">`;

const group=
Math.floor(
(current-1)/5
);

const start=
group*5+1;

const end=
Math.min(
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

for(
let i=start;
i<=end;
i++
){

html+=`
<a
href="/amp?page=${i}"
class="${
i===current
?"active"
:""
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
