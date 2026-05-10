import { getPosts } from "../lib/api";
import {
SITE,
sanitizeSlug
} from "../lib/config";
import { withCache } from "../lib/cache";

export async function onRequest(context){

return withCache(
context,
3600,
async()=>{

try{

const posts=
await getPosts();

const used=
new Set();

const urls=
posts
.filter(p=>{

const slug=
sanitizeSlug(p.slug);

if(
!slug ||
used.has(slug)
){
return false;
}

used.add(slug);

return true;

})
.map(p=>{

const slug=
sanitizeSlug(p.slug);

const updated=
p.updated||
p.created||
new Date().toISOString();

return `
<url>
<loc>
${SITE.domain}/${slug}
</loc>
<lastmod>
${updated}
</lastmod>
<changefreq>
daily
</changefreq>
<priority>
0.8
</priority>
</url>
`;

})
.join("");

const xml=`<?xml version="1.0" encoding="UTF-8"?>

<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
<loc>${SITE.domain}/</loc>
<changefreq>hourly</changefreq>
<priority>1.0</priority>
</url>

${urls}

</urlset>`;

return new Response(
xml,
{
headers:{
"content-type":
"application/xml;charset=UTF-8",
"cache-control":
"public,max-age=3600"
}
}
);

}catch(e){

return new Response(
"Sitemap Error: "+e.message,
{
status:500
}
);

}

}
);

}
