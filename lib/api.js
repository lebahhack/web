import { API_BASE,sanitizeSlug } from "./config";

let CACHE=null;
let LAST_FETCH=0;

const TTL=60*1000;

async function fetchJSON(url){

try{

const res=await fetch(url,{
headers:{
"accept":"application/json"
}
});

if(!res.ok){
throw new Error("API "+res.status);
}

return await res.json();

}catch(e){

console.error(
"API ERROR:",
e.message
);

if(CACHE) return CACHE;

return [];

}

}

export async function getPosts(){

const now=Date.now();

if(
CACHE &&
(now-LAST_FETCH<TTL)
){
return CACHE;
}

const data=await fetchJSON(
API_BASE+"/posts"
);

const posts=(data||[])

.filter(Boolean)

.map(p=>({

slug:sanitizeSlug(
p.slug||""
),

title:String(
p.title||"No Title"
).trim(),

content:String(
p.content||""
),

kategori:String(
p.kategori||"umum"
)
.toLowerCase()
.trim(),

description:String(
p.description||""
).trim(),

image:String(
p.image||""
).trim(),

created:p.created||
new Date().toISOString(),

updated:p.updated||
p.created||
new Date().toISOString()

}))

.filter(p=>
p.slug &&
p.title
);

posts.sort((a,b)=>
new Date(b.created)-
new Date(a.created)
);

CACHE=posts;
LAST_FETCH=now;

return posts;

}

export async function getPost(slug){

if(!slug) return null;

const safeSlug=
sanitizeSlug(slug);

const posts=
await getPosts();

return posts.find(
p=>p.slug===safeSlug
)||null;

}

export async function getRelated(post,limit=6){

if(!post) return [];

const posts=
await getPosts();

const titleWords=
(post.title||"")
.toLowerCase()
.split(/\s+/)
.filter(w=>w.length>3);

return posts

.filter(p=>
p.slug!==post.slug
)

.map(p=>{

let score=0;

titleWords.forEach(w=>{

if(
p.title
.toLowerCase()
.includes(w)
){
score++;
}

});

if(
p.kategori===
post.kategori
){
score+=3;
}

return {
...p,
score
};

})

.sort((a,b)=>
b.score-a.score
)

.slice(0,limit);

}

export async function searchPosts(query){

if(!query) return [];

const q=sanitizeQuery(query);

const posts=
await getPosts();

return posts

.filter(p=>

(p.title||"")
.toLowerCase()
.includes(q)

)

.slice(0,20);

}

export async function getLatest(limit=10){

const posts=
await getPosts();

return posts.slice(0,limit);

}

function sanitizeQuery(q=""){

return String(q)

.toLowerCase()

.replace(/<[^>]*>?/gm,"")

.replace(/[^\p{L}\p{N}\s-]/gu,"")

.replace(/\s+/g," ")

.trim();

}
