export const SITE={
name:"Auto Blog",
domain:"https://domain.com",
description:"Blog modern cepat dan SEO",
defaultImage:"/og/default"
};

export const API_BASE="https://api-workers.workers.dev";

export function url(path=""){
if(!path.startsWith("/")) path="/"+path;
return SITE.domain+path;
}

export function canonical(path=""){
return url(path);
}

export function amphtml(path=""){
if(!path.startsWith("/")) path="/"+path;
return SITE.domain+"/amp"+path;
}

export function ogImage(slug=""){
return url("/og/"+sanitizeSlug(slug));
}

export function sanitizeSlug(str=""){
return String(str)
.toLowerCase()
.replace(/<[^>]*>?/gm,"")
.replace(/[^\w\s-]/g,"")
.trim()
.replace(/\s+/g,"-");
}

export function stripHTML(html=""){
return String(html)
.replace(/<[^>]*>?/gm," ")
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
return `<img loading="lazy" decoding="async" src="${src}" alt="${alt}" width="400" height="210">`;
}

export function postImage(src,alt=""){
return `<img loading="eager" fetchpriority="high" src="${src}" alt="${alt}" width="1200" height="630">`;
}
