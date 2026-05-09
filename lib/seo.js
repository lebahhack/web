import {
SITE,
canonical,
pageTitle,
cleanDescription,
safeImage
} from "./config";

export function renderSEO({

title="",
description="",
image="",
url="",
type="website",
jsonld=null

}){

const seoTitle=pageTitle(title);

const seoDesc=cleanDescription(
description||SITE.description,
160
);

const seoUrl=canonical(url);

const seoImage=safeImage(image);

return `

<title>${seoTitle}</title>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width,initial-scale=1">

<meta name="description"
content="${seoDesc}">

<meta name="robots"
content="index,follow,max-image-preview:large">

<meta name="language"
content="${SITE.lang}">

<meta name="author"
content="${SITE.author}">

<link rel="canonical"
href="${seoUrl}">

<link rel="icon"
href="${SITE.favicon}">

<meta property="og:type"
content="${type}">

<meta property="og:site_name"
content="${SITE.name}">

<meta property="og:title"
content="${seoTitle}">

<meta property="og:description"
content="${seoDesc}">

<meta property="og:url"
content="${seoUrl}">

<meta property="og:image"
content="${seoImage}">

<meta property="og:locale"
content="${SITE.locale}">

<meta name="twitter:card"
content="summary_large_image">

<meta name="twitter:title"
content="${seoTitle}">

<meta name="twitter:description"
content="${seoDesc}">

<meta name="twitter:image"
content="${seoImage}">

<meta name="theme-color"
content="#000000">

<link rel="alternate"
type="application/rss+xml"
title="${SITE.name}"
href="${SITE.url}/rss.xml">

<script type="application/ld+json">
${JSON.stringify(
jsonld||{
"@context":"https://schema.org",
"@type":"WebSite",
name:SITE.name,
url:SITE.url
}
)}
</script>

`;

}
