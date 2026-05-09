import { getPosts } from "../lib/api";
import { renderTemplate } from "../lib/template";
import { SITE,cleanDescription } from "../lib/config";

export async function onRequest({ request }) {

const url=new URL(request.url);

const q=(url.searchParams.get("q")||"")
.toLowerCase()
.trim();

const page=parseInt(
url.searchParams.get("page")||"1"
);

const perPage=20;

if(!q){
return Response.redirect(
`${SITE.url}/`,
302
);
}

const posts=(await getPosts())

.map(post=>({
...post,
score:getScore(q,post)
}))

.filter(p=>p.score>0)

.sort((a,b)=>b.score-a.score);

const total=posts.length;

const totalPages=Math.ceil(
total/perPage
);

const paginated=posts.slice(
(page-1)*perPage,
page*perPage
);

const title=`Search "${q}" - ${SITE.name}`;

const description=cleanDescription(
`Hasil pencarian ${q} di ${SITE.name}`,
160
);

const jsonld={
"@context":"https://schema.org",
"@type":"SearchResultsPage",
name:title,
description,
url:`${SITE.url}/search?q=${encodeURIComponent(q)}`
};

return new Response(
renderTemplate({
site:SITE,
title,
description,
slug:`search?q=${q}`,
posts:paginated,
image:SITE.logo,
jsonld,
search:q,
pagination:{
page,
totalPages,
base:`/search?q=${encodeURIComponent(q)}`
}
}),
{
headers:{
"content-type":"text/html;charset=UTF-8",
"cache-control":"public,max-age=300,s-maxage=600"
}
}
);

}

function getScore(q,post){

let score=0;

const title=(post.title||"")
.toLowerCase();

const content=(post.content||"")
.toLowerCase();

q.split(" ").forEach(word=>{

if(title.includes(word)){
score+=3;
}

if(content.includes(word)){
score+=1;
}

});

return score;

}
