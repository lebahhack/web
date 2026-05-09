import { getPost,getPosts } from "../lib/api";
import { renderTemplate } from "../lib/template";
import { SITE,sanitizeSlug,cleanDescription } from "../lib/config";

export async function onRequest({ params }) {

const slug=sanitizeSlug(params.slug);

const post=await getPost(slug);

if(!post){
return new Response(
"404 Not Found",
{ status:404 }
);
}

const posts=await getPosts();

const related=posts
.filter(p=>p.slug!==slug)
.map(p=>({
...p,
score:getScore(post.title,p.title)
}))
.sort((a,b)=>b.score-a.score)
.slice(0,8);

const description=cleanDescription(
post.meta_description||
post.content||
post.title,
160
);

const image=post.image||SITE.logo;

const jsonld={
"@context":"https://schema.org",
"@type":"Article",
headline:post.title,
description,
image:[image],
author:{
"@type":"Organization",
name:SITE.name
},
publisher:{
"@type":"Organization",
name:SITE.name,
logo:{
"@type":"ImageObject",
url:SITE.logo
}
},
mainEntityOfPage:`${SITE.url}/${slug}`,
datePublished:post.created||new Date().toISOString(),
dateModified:post.updated||post.created||new Date().toISOString()
};

return new Response(
renderTemplate({
site:SITE,
slug,
title:post.title,
description,
content:post.content||"",
image,
posts:related,
jsonld
}),
{
headers:{
"content-type":"text/html;charset=UTF-8",
"cache-control":"public,max-age=300,s-maxage=600"
}
}
);

}

function getScore(a="",b=""){

let score=0;

a.toLowerCase()
.split(" ")
.forEach(w=>{

if(
b.toLowerCase()
.includes(w)
){
score++;
}

});

return score;

}
