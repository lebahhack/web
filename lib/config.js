// ======================
// GLOBAL CONFIG
// ======================
export const SITE={

name:"Auto Blog",

domain:
"https://niadzgn.pages.dev",

ampPrefix:"/amp",

description:
"Artikel otomatis SEO cepat modern",

defaultImage:
"/og/default"

};

// ======================
// API
// ======================
export const API_BASE=
"https://api.niadzgn.workers.dev";

// ======================
// URL HELPER
// ======================
export function url(
path=""
){

if(
!path.startsWith("/")
){
path="/"+path;
}

return SITE.domain+path;

}

// ======================
// CANONICAL
// ======================
export function canonical(
path=""
){

return url(path);

}

// ======================
// AMP URL
// ======================
export function amphtml(
path=""
){

if(
!path.startsWith("/")
){
path="/"+path;
}

return (
SITE.domain+
SITE.ampPrefix+
path
);

}

// ======================
// OG IMAGE
// ======================
export function ogImage(
slug=""
){

if(!slug){

return url(
SITE.defaultImage
);

}

return url(
"/og/"+slug
);

}

// ======================
// CLEAN DESCRIPTION
// ======================
export function cleanDescription(
str=""
){

return String(str)

.replace(/\s+/g," ")

.replace(/<[^>]*>?/gm,"")

.trim();

}

// ======================
// STRIP HTML
// ======================
export function stripHTML(
html=""
){

return String(html)

.replace(/<[^>]*>?/gm,"");

}

// ======================
// SLUG
// ======================
export function sanitizeSlug(
slug=""
){

return encodeURIComponent(

String(slug)

.replace(/<[^>]*>?/gm,"")

.replace(/"/g,"")

.replace(/\s+/g,"-")

.toLowerCase()

.trim()

);

}

// ======================
// READING TIME
// ======================
export function readingTime(
text=""
){

const words=
stripHTML(text)
.split(/\s+/)
.length;

return Math.ceil(
words/200
);

}

// ======================
// IMAGE CARD
// ======================
export function cardImage(
src,
alt=""
){

return `
<img
loading="lazy"
decoding="async"
src="${src}"
alt="${escapeHTML(alt)}"
width="400"
height="210">
`;

}

// ======================
// IMAGE POST
// ======================
export function postImage(
src,
alt=""
){

return `
<img
loading="eager"
fetchpriority="high"
decoding="async"
src="${src}"
alt="${escapeHTML(alt)}"
width="1200"
height="630">
`;

}

// ======================
// ESCAPE HTML
// ======================
export function escapeHTML(
str=""
){

return String(str)

.replace(/[&<>"]/g,c=>({

"&":"&amp;",

"<":"&lt;",

">":"&gt;",

'"':"&quot;"

}[c]));

}

// ======================
// ESCAPE JSON
// ======================
export function escapeJSON(
str=""
){

return String(str)

.replace(/\\/g,"\\\\")

.replace(/"/g,'\\"')

.replace(/\n/g," ")

.trim();

}
