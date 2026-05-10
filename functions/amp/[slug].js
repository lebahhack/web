import { renderAmp } from "../../lib/renderAmp";
import {
SITE,
canonical,
sanitizeSlug,
ogImage,
stripHTML,
cleanDescription,
readingTime
} from "../../lib/config";
import {
getPost,
getPosts
} from "../../lib/api";
import { seo } from "../../lib/seo";
import { withCache } from "../../lib/cache";

export async function onRequest(context){

return withCache(
context,
300,
async()=>{

try{

let { slug }=
context.params;

slug=
sanitizeSlug(slug);

const post=
await getPost(slug);

if(!post){

return new Response(
"404 Not Found",
{ status:404 }
);

}

const posts=
await getPosts();

const related=
posts
.filter(p=>

p.slug!==slug &&

p.kategori===
post.kategori

)
.slice(0,6);

const desc=
cleanDescription(
stripHTML(post.content)
.slice(0,160)
);

const read=
readingTime(
post.content
);

const schema=
seo({
title:post.title,
description:desc,
slug,
published:post.created,
updated:post.updated,
kategori:post.kategori
});

const content=
formatAmpContent(
post.content
);

return renderAmp({

title:post.title,

description:desc,

canonical:canonical(
"/"+slug
),

schema,

content:`

<nav class="breadcrumb">

<a href="/amp">
Home
</a>

›

<span>
${post.title}
</span>

</nav>

<article class="post">

<amp-img
src="${ogImage(slug)}"
width="1200"
height="630"
layout="responsive"
alt="${post.title}">
</amp-img>

<h1>
${post.title}
</h1>

<p>
⏱ ${read} min read
</p>

<div class="post-content">
${content}
</div>

</article>

<h3>
Artikel Terkait
</h3>

<div class="grid">

${related.map(p=>`
<div class="card">

<a href="/amp/${p.slug}">

<amp-img
src="${ogImage(p.slug)}"
width="400"
height="210"
layout="responsive"
alt="${p.title}">
</amp-img>

<h4>
${p.title}
</h4>

</a>

</div>
`).join("")}

</div>

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

// ======================
// FORMAT HTML TO AMP
// ======================
function formatAmpContent(
html=""
){

return String(html)

.replace(
/<img([^>]*)src="([^"]+)"([^>]*)>/gi,
`
<amp-img
src="$2"
width="1200"
height="630"
layout="responsive">
</amp-img>
`
)

.replace(
/<iframe[\s\S]*?<\/iframe>/gi,
""
);

}
