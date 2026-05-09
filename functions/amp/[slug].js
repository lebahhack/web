import { getPost,getPosts } from "../../lib/api";
import { renderTemplate } from "../../lib/template";
import { SITE,sanitizeSlug,cleanDescription } from "../../lib/config";

export async function onRequest({ params,request }) {

const slug=sanitizeSlug(params.slug);
const post=await getPost(slug);

if(!post){
return new Response("404 Not Found",{status:404});
}

const posts=await getPosts();

const related=posts
.filter(p=>p.slug!==slug)
.slice(0,6);

const description=cleanDescription(
post.meta_description||
post.content||
post.title,
160
);

const jsonld={
"@context":"https://schema.org",
"@type":"Article",
headline:post.title,
description,
image:[post.image||SITE.logo],
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
amp:true,
site:SITE,
slug,
title:post.title,
description,
content:cleanAmp(post.content||""),
image:post.image||SITE.logo,
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

function cleanAmp(html=""){
return String(html)

.replace(/<script[\s\S]*?<\/script>/gi,"")
.replace(/<style[\s\S]*?<\/style>/gi,"")
.replace(/on\w+="[^"]*"/g,"")
.replace(/<img/gi,"<amp-img layout=\"responsive\" width=\"800\" height=\"450\"")
.replace(/<\/img>/gi,"")
.replace(/\s+/g," ")

.trim();
}
