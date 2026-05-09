import { getPosts } from "../lib/api";
import { renderTemplate } from "../lib/template";
import { SITE,cleanDescription } from "../lib/config";

export async function onRequest({ request }) {

const url=new URL(request.url);

const page=parseInt(
url.searchParams.get("page")||"1"
);

const perPage=20;

const posts=await getPosts();

const total=posts.length;

const totalPages=Math.ceil(total/perPage);

const paginated=posts.slice(
(page-1)*perPage,
page*perPage
);

const title=SITE.name;

const description=cleanDescription(
SITE.description,
160
);

const jsonld={
"@context":"https://schema.org",
"@type":"WebSite",
name:SITE.name,
url:SITE.url,
description,
potentialAction:{
"@type":"SearchAction",
target:`${SITE.url}/search?q={search_term_string}`,
"query-input":"required name=search_term_string"
}
};

return new Response(
renderTemplate({
site:SITE,
title,
description,
slug:"",
posts:paginated,
image:SITE.logo,
jsonld,
pagination:{
page,
totalPages,
base:"/"
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
