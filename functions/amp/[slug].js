import { renderAmp } from "../../lib/renderAmp";
import { getPost,getPosts } from "../../lib/api";
import {
SITE,
canonical,
amphtml,
ogImage,
stripHTML,
cleanDescription,
postImage,
readingTime
} from "../../lib/config";

export async function onRequest(context){

try{

const slug=context.params.slug;

const post=await getPost(slug);

if(!post){
return new Response("Not Found",{status:404});
}

const posts=await getPosts();

const related=posts
.filter(p=>p.slug!==post.slug)
.slice(0,6);

let desc=stripHTML(post.content).slice(0,160);
desc=cleanDescription(desc);

const html=`
<article>

<h1>${post.title}</h1>

${postImage(
ogImage(post.slug),
post.title
)}

<p>
${readingTime(post.content)} min read
</p>

<div>
${post.content}
</div>

${related.length?`
<h2>Artikel Terkait</h2>

<ul>
${related.map(p=>`
<li>
<a href="/${p.slug}">
${p.title}
</a>
</li>
`).join("")}
</ul>
`:""}

</article>
`;

return renderAmp({
title:post.title,
description:desc,
canonical:canonical("/"+post.slug),
amp:amphtml("/"+post.slug),
image:ogImage(post.slug),
content:html,
schema:`
<script type="application/ld+json">
{
"@context":"https://schema.org",
"@type":"BlogPosting",
"headline":${JSON.stringify(post.title)},
"description":${JSON.stringify(desc)},
"url":"${canonical("/"+post.slug)}",
"image":"${ogImage(post.slug)}",
"publisher":{
"@type":"Organization",
"name":"${SITE.name}"
}
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
