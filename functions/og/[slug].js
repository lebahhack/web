import {
SITE,
sanitizeSlug,
escapeHTML
} from "../../lib/config";

import {
getPost
} from "../../lib/api";

import {
withCache
} from "../../lib/cache";

export async function onRequest(
context
){

return withCache(
context,
86400,
async()=>{

try{

let { slug }=
context.params;

slug=
sanitizeSlug(slug);

const post=
await getPost(slug);

const title=
post?.title||
SITE.name;

const svg=`
<svg
xmlns="http://www.w3.org/2000/svg"
width="1200"
height="630">

<defs>

<linearGradient
id="bg"
x1="0"
y1="0"
x2="1"
y2="1">

<stop
offset="0%"
stop-color="#4f46e5"
/>

<stop
offset="100%"
stop-color="#111827"
/>

</linearGradient>

</defs>

<rect
width="1200"
height="630"
fill="url(#bg)"
rx="0"
/>

<text
x="60"
y="120"
fill="#ffffff"
font-size="38"
font-family="Arial"
font-weight="700">

${escapeXML(SITE.name)}

</text>

<foreignObject
x="60"
y="180"
width="1080"
height="320">

<div
xmlns="http://www.w3.org/1999/xhtml"
style="
font-size:64px;
font-family:Arial;
font-weight:700;
line-height:1.2;
color:white;
word-break:break-word;
">

${escapeHTML(title)}

</div>

</foreignObject>

<text
x="60"
y="570"
fill="#cbd5e1"
font-size="28"
font-family="Arial">

${SITE.domain}

</text>

</svg>
`;

return new Response(
svg,
{
headers:{
"content-type":
"image/svg+xml",
"cache-control":
"public,max-age=86400"
}
}
);

}catch(e){

return new Response(
"OG Error: "+e.message,
{
status:500
}
);

}

}
);

}

// ======================
// ESCAPE XML
// ======================
function escapeXML(
str=""
){

return String(str)
.replace(/&/g,"&amp;")
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")
.replace(/"/g,"&quot;")
.replace(/'/g,"&apos;");

}
