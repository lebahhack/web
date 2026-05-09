import { getPosts } from "../../lib/api";
import { cleanDescription } from "../../lib/config";

export async function onRequest({ request }) {

const url=new URL(request.url);

const q=(url.searchParams.get("q")||"")
.toLowerCase()
.trim();

const limit=parseInt(
url.searchParams.get("limit")||"20"
);

if(!q){
return json({
status:false,
message:"query required"
},400);
}

const posts=await getPosts();

const results=posts
.map(post=>({
...post,
score:getScore(q,post)
}))
.filter(p=>p.score>0)
.sort((a,b)=>b.score-a.score)
.slice(0,limit)
.map(p=>({
slug:p.slug,
title:p.title,
image:p.image||"",
kategori:p.kategori||"",
description:cleanDescription(
p.meta_description||
p.content||
"",
140
),
score:p.score
}));

return json({
status:true,
query:q,
total:results.length,
results
});

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

function json(data,status=200){
return new Response(
JSON.stringify(data),
{
status,
headers:{
"content-type":"application/json;charset=UTF-8",
"cache-control":"public,max-age=300,s-maxage=600"
}
}
);
}
