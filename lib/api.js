import { SITE,sanitizeSlug } from "./config";

const API=SITE.api_url;

export async function getPosts(page=1,limit=200){

try{

const res=await fetch(
`${API}/posts?page=${page}&limit=${limit}`,
{
headers:{
accept:"application/json"
},
cf:{
cacheTtl:300,
cacheEverything:true
}
}
);

const data=await res.json();

return data.results||data.posts||[];

}catch{

return[];

}

}

export async function getPost(slug){

try{

const safe=sanitizeSlug(slug);

const res=await fetch(
`${API}/post?slug=${safe}`,
{
headers:{
accept:"application/json"
},
cf:{
cacheTtl:300,
cacheEverything:true
}
}
);

const data=await res.json();

return data.post||null;

}catch{

return null;

}

}

export async function searchPosts(q="",page=1,limit=20){

try{

const res=await fetch(
`${API}/search?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`,
{
headers:{
accept:"application/json"
},
cf:{
cacheTtl:300,
cacheEverything:true
}
}
);

const data=await res.json();

return data.results||[];

}catch{

return[];

}

}

export async function getKategori(slug,page=1,limit=20){

try{

const safe=sanitizeSlug(slug);

const posts=await getPosts(1,500);

return posts

.filter(p=>
(p.kategori||"")
.toLowerCase()===safe
.toLowerCase()
)

.slice(
(page-1)*limit,
page*limit
);

}catch{

return[];

}

}
