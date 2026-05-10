export const SITE={
name:"Auto Blog",
description:"Artikel otomatis + SEO + cepat",
domain:"https://web.lebahhack.net"
};

export const API_BASE="https://web.lebahhack.workers.dev";

export const url=(path="")=>{
if(!path) return SITE.domain;
if(path.startsWith("http")) return path;
if(!path.startsWith("/")) path="/"+path;
return SITE.domain+path;
};

export const amphtml=(path="")=>{
if(path.startsWith("http")){
path=path.replace(SITE.domain,"");
}
if(!path.startsWith("/")) path="/"+path;
return SITE.domain+"/amp"+path;
};

export const canonical=(path="")=>{
return url(path);
};

export const ogImage=(slug="")=>{
if(!slug) return url("/og/default");
return url("/og/"+sanitizeSlug(slug));
};

export function sanitizeSlug(str=""){
return String(str)
.toLowerCase()
.replace(/<[^>]*>?/gm,"")
.replace(/[^\w\s-]/g,"")
.replace(/\s+/g,"-")
.replace(/-+/g,"-")
.trim();
}

export function stripHTML(html=""){
return String(html)
.replace(/<[^>]*>?/gm,"")
.replace(/\s+/g," ")
.trim();
}

export function cleanDescription(str=""){
return String(str)
.replace(/\s+/g," ")
.trim();
}

export function readingTime(text=""){
const words=stripHTML(text).split(" ").length;
return Math.ceil(words/200);
}

export function cardImage(src,alt=""){
return `
<img
loading="lazy"
decoding="async"
src="${url(src)}"
alt="${alt}"
width="400"
height="210"
>
`;
}

export function postImage(src,alt=""){
return `
<img
loading="eager"
fetchpriority="high"
decoding="async"
src="${url(src)}"
alt="${alt}"
width="1200"
height="630"
>
`;
}
