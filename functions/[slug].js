import { layout } from "../lib/render";
import { getPosts,getPost } from "../lib/api";
import {
SITE,
canonical,
ogImage,
sanitizeSlug,
stripHTML,
readingTime,
cleanDescription,
postImage,
cardImage,
escapeHTML
} from "../lib/config";
import { seo } from "../lib/seo";
import { withCache } from "../lib/cache";

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
sanitizeSlug(p.slug)!==slug &&
p.kategori===post.kategori
)
.slice(0,6);

const linkedContent=
autoLink(
post.content,
related
);

const read=
readingTime(linkedContent);

let desc=
stripHTML(linkedContent)
.slice(0,160);

desc=
cleanDescription(desc);

const url=
canonical("/"+slug);

const og=
ogImage(slug);

const breadcrumb=`
<nav class="breadcrumb">
<a href="/">
Home
</a>
<span>›</span>
<a href="/kategori/${sanitizeSlug(post.kategori)}">
${escapeHTML(post.kategori)}
</a>
<span>›</span>
<span>
${escapeHTML(post.title)}
</span>
</nav>
`;

const relatedHTML=
related.map(p=>`
<div class="card">
<a href="/${p.slug}">
${cardImage(
ogImage(p.slug),
p.title
)}
<h3>${p.title}</h3>
</a>
</div>
`).join("");

return layout({

title:post.title,

description:desc,

canonical:url,

image:og,

schema:seo({
title:post.title,
description:desc,
slug,
kategori:post.kategori,
published:post.created,
updated:post.updated
}),

content:`

${breadcrumb}

<article class="post">

${postImage(
og,
post.title
)}

<h1>
${post.title}
</h1>

<p>
⏱ ${read} min read
</p>

<div class="post-content">
${linkedContent}
</div>

<div class="post-tags">
<a href="/kategori/${sanitizeSlug(post.kategori)}">
#${escapeHTML(post.kategori)}
</a>
</div>

</article>

<h2>
Artikel Terkait
</h2>

<div class="grid">
${relatedHTML}
</div>

`

});

}catch(e){

return new Response(
"Error: "+e.message,
{ status:500 }
);

}

}
);

}

function autoLink(
content="",
related=[]
){

let used=
new Set();

let total=0;

const MAX=5;

return content.replace(
/(<a[^>]*>.*?<\/a>)|>([^<]+)</gi,
(match,link,text)=>{

if(link){
return link;
}

let result=text;

for(const p of related){

if(total>=MAX){
break;
}

const keyword=
p.title
.split(" ")
.slice(0,2)
.join(" ")
.toLowerCase();

if(
!keyword ||
used.has(keyword)
){
continue;
}

const regex=
new RegExp(
`\\b${escapeRegex(keyword)}\\b`,
"i"
);

if(regex.test(result)){

result=
result.replace(
regex,
`<a href="/${p.slug}">${keyword}</a>`
);

used.add(keyword);

total++;

}

}

return ">"+result+"<";

}
);

}

function escapeRegex(str=""){

return str.replace(
/[.*+?^${}()|[\]\\]/g,
"\\$&"
);

}
