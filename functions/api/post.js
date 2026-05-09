import { getPost,getPosts } from "../../lib/api";

export async function onRequest({ request }) {

const url=new URL(request.url);
const slug=url.searchParams.get("slug");

if(!slug){
return json({
status:false,
message:"slug required"
},400);
}

const post=await getPost(slug);

if(!post){
return json({
status:false,
message:"post not found"
},404);
}

const posts=await getPosts();

const related=posts
.filter(p=>p.slug!==slug)
.map(p=>({
...p,
score:getScore(post.title,p.title)
}))
.sort((a,b)=>b.score-a.score)
.slice(0,6);

return json({
status:true,
post:{
...post,
related
}
});

}

function getScore(a="",b=""){
let score=0;

a.toLowerCase().split(" ").forEach(w=>{
if(b.toLowerCase().includes(w)){
score++;
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
"cache-control":"public,max-age=300"
}
}
);
}
