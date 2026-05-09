import { getPosts } from "../lib/api";
import { SITE,cleanDescription } from "../lib/config";

export async function onRequest() {

const posts=(await getPosts())
.slice(0,30);

const items=posts.map(post=>`

<item>

<title><![CDATA[${post.title}]]></title>

<link>${SITE.url}/${post.slug}</link>

<guid>${SITE.url}/${post.slug}</guid>

<pubDate>${
new Date(
post.created||
Date.now()
).toUTCString()
}</pubDate>

<description><![CDATA[${
cleanDescription(
post.content||
"",
200
)
}]]></description>

</item>

`).join("");

const xml=`<?xml version="1.0" encoding="UTF-8"?>

<rss version="2.0">

<channel>

<title>${SITE.name}</title>

<link>${SITE.url}</link>

<description>${SITE.description}</description>

<language>id</language>

<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>

${items}

</channel>

</rss>`;

return new Response(xml,{
headers:{
"content-type":"application/xml;charset=UTF-8",
"cache-control":"public,max-age=1800"
}
});

}
