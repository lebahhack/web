export const SITE={
name:"Auto Blog",
domain:"https://niadzgn.pages.dev",
description:"Artikel SEO modern, AI content, blogging, dan teknologi terbaru.",
defaultImage:"/og/default",
language:"id-ID"
};

export const API_BASE=
"https://api.niadzgn.workers.dev";

export function url(path=""){

if(!path.startsWith("/")){
path="/"+path;
}

return SITE.domain+path;

}

export function canonical(path=""){
return url(path);
}

export function amphtml(path=""){

if(!path.startsWith("/")){
path="/"+path;
}

return SITE.domain+"/amp"+path;

}

export function ogImage(slug=""){

if(!slug){
return url(SITE.defaultImage);
}

return url("/og/"+sanitizeSlug(slug));

}

export function sanitizeSlug(slug=""){

return encodeURIComponent(

String(slug)

.toLowerCase()

.replace(/<[^>]*>?/gm,"")

.replace(/[^\p{L}\p{N}\s-]/gu,"")

.replace(/\s+/g,"-")

.replace(/-+/g,"-")

.trim()

);

}

export function stripHTML(html=""){

return String(html)

.replace(/<script[\s\S]*?<\/script>/gi,"")

.replace(/<style[\s\S]*?<\/style>/gi,"")

.replace(/<[^>]*>?/gm,"")

.replace(/\s+/g," ")

.trim();

}

export function cleanDescription(str=""){

return String(str)

.replace(/\s+/g," ")

.replace(/[\r\n\t]+/g," ")

.trim();

}

export function getDescription(content="",max=160){

return cleanDescription(
stripHTML(content)
).slice(0,max);

}

export function readingTime(text=""){

const words=
stripHTML(text)
.split(/\s+/)
.length;

return Math.max(
1,
Math.ceil(words/200)
);

}

export function cardImage(src,alt=""){

return `
<img
src="${src}"
alt="${escapeHTML(alt)}"
loading="lazy"
decoding="async"
width="400"
height="210"
>
`;

}

export function postImage(src,alt=""){

return `
<img
src="${src}"
alt="${escapeHTML(alt)}"
fetchpriority="high"
loading="eager"
decoding="async"
width="1200"
height="630"
>
`;

}

export function escapeHTML(str=""){

return String(str)

.replace(/[&<>"]/g,c=>({

"&":"&amp;",

"<":"&lt;",

">":"&gt;",

'"':"&quot;"

}[c]));

}

export function escapeJSON(str=""){

return String(str)

.replace(/\\/g,"\\\\")

.replace(/"/g,'\\"')

.replace(/\n/g," ")

.replace(/\r/g," ");

}
