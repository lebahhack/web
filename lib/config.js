export const SITE={

name:"LebahHack",

title:"LebahHack",

description:"SEO Blog System Indonesia",

url:"https://web.lebahhack.net",

domain:"web.lebahhack.net",

api_url:"https://web.lebahhack.workers.dev",

logo:"https://dummyimage.com/512x512/000/fff.png&text=LebahHack",

favicon:"https://dummyimage.com/64x64/000/fff.png&text=L",

locale:"id_ID",

lang:"id",

author:"LebahHack",

email:"admin@lebahhack.net",

telegram:"#",

whatsapp:"#",

twitter:"#",

facebook:"#",

instagram:"#"

};

export function sanitizeSlug(str=""){

return String(str)

.toLowerCase()

.replace(/[^a-z0-9\-\/]/g,"")

.replace(/\s+/g,"-")

.replace(/\-+/g,"-")

.trim();

}

export function cleanDescription(
text="",
limit=160
){

return String(text)

.replace(/<[^>]*>/g," ")

.replace(/\s+/g," ")

.trim()

.slice(0,limit);

}

export function stripHtml(html=""){

return String(html)

.replace(/<script[\s\S]*?<\/script>/gi,"")

.replace(/<style[\s\S]*?<\/style>/gi,"")

.replace(/<[^>]+>/g," ")

.replace(/\s+/g," ")

.trim();

}

export function safeImage(img=""){

if(
!img ||
img==="undefined"
){
return SITE.logo;
}

if(
img.startsWith("//")
){
return "https:"+img;
}

if(
img.startsWith("/")
){
return SITE.url+img;
}

return img;

}

export function canonical(path=""){

return `${SITE.url}/${path}`
.replace(/([^:]\/)\/+/g,"$1");

}

export function pageTitle(
title=""
){

return title
?`${title} - ${SITE.name}`
:SITE.name;

}

export function formatDate(date){

try{

return new Date(date)
.toLocaleDateString(
"id-ID",
{
day:"numeric",
month:"long",
year:"numeric"
}
);

}catch{

return "";

}

}
