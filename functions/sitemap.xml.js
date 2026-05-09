import { getPosts } from "../lib/api";
import { SITE } from "../lib/config";

export async function onRequest() {

const posts=await getPosts();

const urls=posts.map(post=>`

<url>

<loc>${SITE.url}/${post.slug}</loc>

<lastmod>${
new Date(
post.updated||
post.created||
Date.now()
).toISOString()
}</lastmod>

<changefreq>daily</changefreq>

<priority>0.8</priority>

</url>

<url>

<loc>${SITE.url}/amp/${post.slug}</loc>

<lastmod>${
new Date(
post.updated||
post.created||
Date.now()
).toISOString()
}</lastmod>

<changefreq>daily</changefreq>

<priority>0.7</priority>

</url>

`).join("");

const xml=`<?xml version="1.0" encoding="UTF-8"?>

<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>

<loc>${SITE.url}</loc>

<changefreq>hourly</changefreq>

<priority>1.0</priority>

</url>

${urls}

</urlset>`;

return new Response(xml,{
headers:{
"content-type":"application/xml;charset=UTF-8",
"cache-control":"public,max-age=1800"
}
});

}
