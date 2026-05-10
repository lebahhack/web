import { getPosts } from "../lib/api";
import {
SITE,
sanitizeSlug,
stripHTML,
escapeHTML
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

const items=
posts
.slice(0,20)
.map(p=>{

const slug=
sanitizeSlug(p.slug);

const desc=
stripHTML(p.content)
.slice(0,200);

const pubDate=
new Date(
p.created||
Date.now()
).toUTCString();

return `
<item>

<title>
${escapeHTML(p.title)}
</title>

<link>
${SITE.domain}/${slug}
</link>

<guid>
${SITE.domain}/${slug}
</guid>

<description>
<![CDATA[
${desc}
]]>
</description>

<pubDate>
${pubDate}
</pubDate>

</item>
`;

})
.join("");

const xml=`<?xml version="1.0" encoding="UTF-8"?>

<rss
version="2.0">

<channel>

<title>
${SITE.name}
</title>

<link>
${SITE.domain}
</link>

<description>
${SITE.description}
</description>

<language>
id-ID
</language>

<lastBuildDate>
${new Date().toUTCString()}
</lastBuildDate>

${items}

</channel>

</rss>`;

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
"RSS Error: "+e.message,
{
status:500
}
);

}

}
);

}
