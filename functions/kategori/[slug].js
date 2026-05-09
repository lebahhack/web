import { getPosts } from "../../lib/api";
import { renderTemplate } from "../../lib/template";
import { SITE,sanitizeSlug,cleanDescription } from "../../lib/config";

export async function onRequest({ params,request }) {

const kategori=sanitizeSlug(params.slug);

const url=new URL(request.url);

const page=parseInt(
url.searchParams.get("page")||"1"
);

const perPage=20;

const posts=(await getPosts())
.filter(p=>
(p.kategori||"umum")
.toLowerCase()===kategori
.toLowerCase()
);

if(!posts.length){
return new Response(
"404 Not Found",
{ status:404 }
);
}

const total=posts.length;
const totalPages=Math.ceil(total/perPage);

const paginated=posts.slice(
(page-1)*perPage,
page*perPage
);

const title=`Kategori ${kategori} - ${SITE.name}`;

const description=cleanDescription(
`Kumpulan artikel kategori ${kategori} terbaru dari ${SITE.name}`,
160
);

const jsonld={
"@context":"https://schema.org",
"@type":"CollectionPage",
name:title,
description,
url:`${SITE.url}/kategori/${kategori}`
};

return new Response(
renderTemplate({
site:SITE,
title,
description,
slug:`kategori/${kategori}`,
posts:paginated,
image:SITE.logo,
jsonld,
pagination:{
page,
totalPages,
base:`/kategori/${kategori}`
}
}),
{
headers:{
"content-type":"text/html;charset=UTF-8",
"cache-control":"public,max-age=300,s-maxage=600"
}
}
);

}
