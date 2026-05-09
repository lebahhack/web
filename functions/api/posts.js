import { getPosts } from "../../lib/api";
import { cleanDescription } from "../../lib/config";

export async function onRequest({ request }) {

const url=new URL(request.url);

const page=parseInt(
url.searchParams.get("page")||"1"
);

const limit=parseInt(
url.searchParams.get("limit")||"20"
);

const q=(url.searchParams.get("q")||"")
.toLowerCase();

let posts=await getPosts();

if(q){
posts=posts.filter(p=>
(p.title||"")
.toLowerCase()
.includes(q)
);
}

const total=posts.length;
const totalPages=Math.ceil(total/limit);

const start=(page-1)*limit;

const results=posts
.slice(start,start+limit)
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
created:p.created||"",
updated:p.updated||""
}));

return json({
status:true,
page,
limit,
total,
totalPages,
results
});

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
