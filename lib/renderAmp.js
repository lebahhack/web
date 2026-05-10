import { SITE } from "./config";

export function renderAmp({
title="AMP",
description="AMP Page",
canonical="",
content=""
}){

return new Response(`<!doctype html>
<html amp lang="id">
<head>
<meta charset="utf-8">
<title>${title}</title>
<link rel="canonical" href="${canonical}">
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<meta name="description" content="${description}">
<script async src="https://cdn.ampproject.org/v0.js"></script>
<style amp-boilerplate>
body{
visibility:hidden
}
</style>
<noscript>
<style amp-boilerplate>
body{
visibility:visible
}
</style>
</noscript>
<style amp-custom>
body{
font-family:Arial,sans-serif;
padding:20px;
line-height:1.7;
background:#fff;
color:#111
}
img{
max-width:100%;
height:auto
}
a{
color:#4f46e5;
text-decoration:none
}
.container{
max-width:800px;
margin:auto
}
</style>
</head>
<body>
<div class="container">
${content}
</div>
</body>
</html>`,{
headers:{
"content-type":"text/html;charset=UTF-8"
}
});

}
